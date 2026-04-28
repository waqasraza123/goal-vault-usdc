pragma solidity ^0.8.30;

import {Test} from "forge-std/Test.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {GoalVault} from "../src/GoalVault.sol";
import {GoalVaultFactory} from "../src/GoalVaultFactory.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("USD Coin", "USDC") {}

    function decimals() public pure override returns (uint8) {
        return 6;
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract FalseReturnToken {
    mapping(address account => uint256 amount) public balanceOf;
    mapping(address owner => mapping(address spender => uint256 amount)) public allowance;

    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        return true;
    }

    function transfer(address, uint256) external pure returns (bool) {
        return false;
    }

    function transferFrom(address, address, uint256) external pure returns (bool) {
        return false;
    }
}

contract RevertingToken {
    mapping(address account => uint256 amount) public balanceOf;
    mapping(address owner => mapping(address spender => uint256 amount)) public allowance;

    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        return true;
    }

    function transfer(address, uint256) external pure returns (bool) {
        revert("TOKEN_REVERTED");
    }

    function transferFrom(address, address, uint256) external pure returns (bool) {
        revert("TOKEN_REVERTED");
    }
}

contract ReentrantToken {
    mapping(address account => uint256 amount) public balanceOf;
    mapping(address owner => mapping(address spender => uint256 amount)) public allowance;

    GoalVault public vault;
    bool public attackDuringTransfer;
    bool public reentryBlocked;
    bool public reentrySucceeded;

    function setVault(GoalVault vault_) external {
        vault = vault_;
    }

    function setAttackDuringTransfer(bool enabled) external {
        attackDuringTransfer = enabled;
    }

    function primeReentrantDeposit(uint256 amount) external {
        balanceOf[address(this)] += amount;
        allowance[address(this)][address(vault)] = amount;
    }

    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        return true;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "INSUFFICIENT_BALANCE");

        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;

        if (attackDuringTransfer) {
            try vault.deposit(1) {
                reentrySucceeded = true;
            } catch {
                reentryBlocked = true;
            }
        }

        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(balanceOf[from] >= amount, "INSUFFICIENT_BALANCE");
        require(allowance[from][msg.sender] >= amount, "INSUFFICIENT_ALLOWANCE");

        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;

        return true;
    }
}

contract GoalVaultRuleSystemTest is Test {
    event VaultCreated(
        address indexed owner,
        address indexed vault,
        address indexed asset,
        uint256 targetAmount,
        uint64 unlockAt,
        uint256 createdAt
    );

    event VaultCreatedV2(
        address indexed owner,
        address indexed vault,
        address indexed asset,
        uint256 targetAmount,
        uint8 ruleType,
        uint64 unlockAt,
        uint64 cooldownDuration,
        address guardian,
        uint256 createdAt
    );

    event Deposited(address indexed from, uint256 amount, uint256 timestamp);
    event Withdrawn(address indexed to, uint256 amount, uint256 timestamp);
    event UnlockRequested(address indexed requestedBy, uint8 indexed ruleType, uint256 availableAt, uint256 timestamp);
    event UnlockCanceled(address indexed canceledBy, uint8 indexed ruleType, uint256 timestamp);
    event GuardianApproved(address indexed guardian, uint256 timestamp);
    event GuardianRejected(address indexed guardian, uint256 timestamp);

    uint8 internal constant RULE_TIME_LOCK = 0;
    uint8 internal constant RULE_COOLDOWN_UNLOCK = 1;
    uint8 internal constant RULE_GUARDIAN_APPROVAL = 2;

    address internal owner = address(0xA11CE);
    address internal guardian = address(0xB0B);
    address internal outsider = address(0xC0DE);

    MockUSDC internal usdc;
    GoalVaultFactory internal factory;

    function setUp() external {
        usdc = new MockUSDC();
        factory = new GoalVaultFactory(address(usdc));

        usdc.mint(owner, 1_000_000e6);
    }

    function testTimeLockCreationEmitsLegacyAndV2Events() external {
        uint64 unlockAt = uint64(block.timestamp + 30 days);
        uint256 targetAmount = 2_500e6;

        vm.expectEmit(true, false, true, true, address(factory));
        emit VaultCreated(owner, address(0), address(usdc), targetAmount, unlockAt, block.timestamp);
        vm.expectEmit(true, false, true, true, address(factory));
        emit VaultCreatedV2(owner, address(0), address(usdc), targetAmount, RULE_TIME_LOCK, unlockAt, 0, address(0), block.timestamp);

        vm.prank(owner);
        address vaultAddress = factory.createVault(targetAmount, unlockAt);

        assertTrue(factory.isGoalVault(vaultAddress));

        address[] memory ownerVaults = factory.getVaultsByOwner(owner);
        assertEq(ownerVaults.length, 1);
        assertEq(ownerVaults[0], vaultAddress);

        GoalVault vault = GoalVault(vaultAddress);
        (
            uint8 ruleType,
            uint64 storedUnlockAt,
            uint64 cooldownDuration,
            address storedGuardian,
            uint64 unlockRequestedAt,
            uint8 guardianDecision,
            uint64 guardianDecisionAt,
            uint64 unlockEligibleAt,
            bool withdrawalEligible
        ) = vault.getRuleState();

        assertEq(ruleType, RULE_TIME_LOCK);
        assertEq(storedUnlockAt, unlockAt);
        assertEq(cooldownDuration, 0);
        assertEq(storedGuardian, address(0));
        assertEq(unlockRequestedAt, 0);
        assertEq(guardianDecision, 0);
        assertEq(guardianDecisionAt, 0);
        assertEq(unlockEligibleAt, unlockAt);
        assertFalse(withdrawalEligible);
    }

    function testCooldownCreationAndLifecycle() external {
        GoalVault vault = _createCooldownVault(7 days);

        _deposit(vault, 600e6);

        vm.expectEmit(true, true, true, true, address(vault));
        emit UnlockRequested(owner, RULE_COOLDOWN_UNLOCK, block.timestamp + 7 days, block.timestamp);
        vm.prank(owner);
        vault.requestUnlock();

        (
            uint8 ruleType,
            ,
            uint64 cooldownDuration,
            ,
            uint64 unlockRequestedAt,
            ,
            ,
            uint64 unlockEligibleAt,
            bool withdrawalEligible
        ) = vault.getRuleState();

        assertEq(ruleType, RULE_COOLDOWN_UNLOCK);
        assertEq(cooldownDuration, 7 days);
        assertEq(unlockRequestedAt, block.timestamp);
        assertEq(unlockEligibleAt, block.timestamp + 7 days);
        assertFalse(withdrawalEligible);

        vm.prank(owner);
        vm.expectRevert(GoalVault.GoalVaultLocked.selector);
        vault.withdraw(100e6, owner);

        vm.warp(block.timestamp + 7 days + 1);
        vm.expectEmit(true, true, true, true, address(vault));
        emit Withdrawn(owner, 100e6, block.timestamp);
        vm.prank(owner);
        vault.withdraw(100e6, owner);

        (, , , , uint256 totalDeposited, uint256 totalWithdrawn, uint256 vaultBalance, bool isUnlocked) = vault.getSummary();
        assertEq(totalDeposited, 600e6);
        assertEq(totalWithdrawn, 100e6);
        assertEq(vaultBalance, 500e6);
        assertTrue(isUnlocked);
    }

    function testCooldownCancelClearsRequestState() external {
        GoalVault vault = _createCooldownVault(3 days);

        _deposit(vault, 250e6);

        vm.prank(owner);
        vault.requestUnlock();

        vm.expectEmit(true, true, true, true, address(vault));
        emit UnlockCanceled(owner, RULE_COOLDOWN_UNLOCK, block.timestamp);
        vm.prank(owner);
        vault.cancelUnlockRequest();

        (, , , , uint64 unlockRequestedAt, , , uint64 unlockEligibleAt, bool withdrawalEligible) = vault.getRuleState();

        assertEq(unlockRequestedAt, 0);
        assertEq(unlockEligibleAt, 0);
        assertFalse(withdrawalEligible);

        vm.warp(block.timestamp + 3 days + 1);
        vm.prank(owner);
        vm.expectRevert(GoalVault.GoalVaultLocked.selector);
        vault.withdraw(50e6, owner);
    }

    function testGuardianApproveAndRejectFlows() external {
        GoalVault approvingVault = _createGuardianVault();
        _deposit(approvingVault, 400e6);

        vm.expectEmit(true, true, true, true, address(approvingVault));
        emit UnlockRequested(owner, RULE_GUARDIAN_APPROVAL, 0, block.timestamp);
        vm.prank(owner);
        approvingVault.requestUnlock();

        vm.expectEmit(true, true, true, true, address(approvingVault));
        emit GuardianApproved(guardian, block.timestamp);
        vm.prank(guardian);
        approvingVault.approveUnlock();

        (, , , , uint64 unlockRequestedAt, uint8 guardianDecision, uint64 guardianDecisionAt, , bool withdrawalEligible) =
            approvingVault.getRuleState();
        assertEq(unlockRequestedAt, block.timestamp);
        assertEq(guardianDecision, 2);
        assertEq(guardianDecisionAt, block.timestamp);
        assertTrue(withdrawalEligible);

        vm.prank(owner);
        approvingVault.withdraw(100e6, owner);

        GoalVault rejectingVault = _createGuardianVault();
        _deposit(rejectingVault, 200e6);

        vm.prank(owner);
        rejectingVault.requestUnlock();

        vm.expectEmit(true, true, true, true, address(rejectingVault));
        emit GuardianRejected(guardian, block.timestamp);
        vm.prank(guardian);
        rejectingVault.rejectUnlock();

        (, , , , , uint8 rejectedDecision, , , bool rejectedEligible) = rejectingVault.getRuleState();
        assertEq(rejectedDecision, 3);
        assertFalse(rejectedEligible);

        vm.prank(owner);
        vm.expectRevert(GoalVault.GoalVaultLocked.selector);
        rejectingVault.withdraw(50e6, owner);
    }

    function testGuardianAuthorizationAndBypassChecks() external {
        GoalVault vault = _createGuardianVault();
        _deposit(vault, 300e6);

        vm.prank(owner);
        vm.expectRevert(GoalVault.GoalVaultLocked.selector);
        vault.withdraw(50e6, owner);

        vm.prank(outsider);
        vm.expectRevert(GoalVault.GoalVaultUnauthorized.selector);
        vault.approveUnlock();

        vm.prank(guardian);
        vm.expectRevert(GoalVault.GoalVaultGuardianDecisionUnavailable.selector);
        vault.approveUnlock();

        vm.prank(owner);
        vault.requestUnlock();

        vm.prank(owner);
        vm.expectRevert(GoalVault.GoalVaultUnauthorized.selector);
        vault.approveUnlock();
    }

    function testDepositAndWithdrawAccountingForTimeLockVault() external {
        uint64 unlockAt = uint64(block.timestamp + 1 days);
        uint256 targetAmount = 1_000e6;

        vm.prank(owner);
        GoalVault vault = GoalVault(factory.createVault(targetAmount, unlockAt));

        vm.startPrank(owner);
        usdc.approve(address(vault), 700e6);
        vm.expectEmit(true, true, true, true, address(vault));
        emit Deposited(owner, 700e6, block.timestamp);
        vault.deposit(700e6);
        vm.stopPrank();

        vm.warp(block.timestamp + 1 days + 1);
        vm.expectEmit(true, true, true, true, address(vault));
        emit Withdrawn(owner, 200e6, block.timestamp);
        vm.prank(owner);
        vault.withdraw(200e6, owner);

        (, , uint256 target, uint64 storedUnlockAt, uint256 totalDeposited, uint256 totalWithdrawn, uint256 vaultBalance, bool isUnlocked) =
            vault.getSummary();
        assertEq(target, targetAmount);
        assertEq(storedUnlockAt, unlockAt);
        assertEq(totalDeposited, 700e6);
        assertEq(totalWithdrawn, 200e6);
        assertEq(vaultBalance, 500e6);
        assertTrue(isUnlocked);
    }

    function testInvalidGuardianAndDuplicateRuleActionsRevert() external {
        vm.prank(owner);
        vm.expectRevert(GoalVaultFactory.GoalVaultFactoryInvalidGuardian.selector);
        factory.createVault(500e6, RULE_GUARDIAN_APPROVAL, 0, 0, address(0));

        vm.prank(owner);
        vm.expectRevert(GoalVaultFactory.GoalVaultFactoryInvalidGuardian.selector);
        factory.createVault(500e6, RULE_GUARDIAN_APPROVAL, 0, 0, owner);

        GoalVault cooldownVault = _createCooldownVault(5 days);
        _deposit(cooldownVault, 100e6);

        vm.prank(owner);
        cooldownVault.requestUnlock();

        vm.prank(owner);
        vm.expectRevert(GoalVault.GoalVaultUnlockAlreadyRequested.selector);
        cooldownVault.requestUnlock();

        vm.prank(owner);
        cooldownVault.cancelUnlockRequest();

        vm.prank(owner);
        vm.expectRevert(GoalVault.GoalVaultUnlockNotRequested.selector);
        cooldownVault.cancelUnlockRequest();

        uint64 unlockAt = uint64(block.timestamp + 10 days);
        vm.prank(owner);
        GoalVault timeLockVault = GoalVault(factory.createVault(200e6, unlockAt));
        _deposit(timeLockVault, 50e6);

        vm.prank(owner);
        vm.expectRevert(GoalVault.GoalVaultUnsupportedRuleAction.selector);
        timeLockVault.requestUnlock();
    }

    function testFactoryRejectsUnsafeConfiguration() external {
        vm.expectRevert(GoalVaultFactory.GoalVaultFactoryInvalidAsset.selector);
        new GoalVaultFactory(address(0));

        vm.prank(owner);
        vm.expectRevert(GoalVaultFactory.GoalVaultFactoryInvalidTargetAmount.selector);
        factory.createVault(0, uint64(block.timestamp + 1 days));

        vm.prank(owner);
        vm.expectRevert(GoalVaultFactory.GoalVaultFactoryInvalidRuleType.selector);
        factory.createVault(500e6, 99, 0, 0, address(0));

        vm.prank(owner);
        vm.expectRevert(GoalVaultFactory.GoalVaultFactoryInvalidUnlockAt.selector);
        factory.createVault(500e6, RULE_TIME_LOCK, uint64(block.timestamp), 0, address(0));

        vm.prank(owner);
        vm.expectRevert(GoalVaultFactory.GoalVaultFactoryInvalidUnlockAt.selector);
        factory.createVault(500e6, RULE_COOLDOWN_UNLOCK, uint64(block.timestamp + 1 days), 1 days, address(0));

        vm.prank(owner);
        vm.expectRevert(GoalVaultFactory.GoalVaultFactoryInvalidUnlockAt.selector);
        factory.createVault(500e6, RULE_GUARDIAN_APPROVAL, uint64(block.timestamp + 1 days), 0, guardian);

        vm.prank(owner);
        vm.expectRevert(GoalVaultFactory.GoalVaultFactoryInvalidCooldownDuration.selector);
        factory.createVault(500e6, RULE_GUARDIAN_APPROVAL, 0, 1 days, guardian);
    }

    function testDirectVaultConstructionRejectsUnsafeConfiguration() external {
        vm.expectRevert(GoalVault.GoalVaultInvalidOwner.selector);
        new GoalVault(address(0), address(usdc), 1e6, RULE_TIME_LOCK, uint64(block.timestamp + 1 days), 0, address(0));

        vm.expectRevert(GoalVault.GoalVaultInvalidAsset.selector);
        new GoalVault(owner, address(0), 1e6, RULE_TIME_LOCK, uint64(block.timestamp + 1 days), 0, address(0));

        vm.expectRevert(GoalVault.GoalVaultInvalidTargetAmount.selector);
        new GoalVault(owner, address(usdc), 0, RULE_TIME_LOCK, uint64(block.timestamp + 1 days), 0, address(0));

        vm.expectRevert(GoalVault.GoalVaultInvalidUnlockAt.selector);
        new GoalVault(owner, address(usdc), 1e6, RULE_TIME_LOCK, uint64(block.timestamp), 0, address(0));

        vm.expectRevert(GoalVault.GoalVaultInvalidCooldownDuration.selector);
        new GoalVault(owner, address(usdc), 1e6, RULE_COOLDOWN_UNLOCK, 0, 0, address(0));

        vm.expectRevert(GoalVault.GoalVaultInvalidGuardian.selector);
        new GoalVault(owner, address(usdc), 1e6, RULE_GUARDIAN_APPROVAL, 0, 0, owner);
    }

    function testWithdrawRejectsZeroRecipient() external {
        uint64 unlockAt = uint64(block.timestamp + 1 days);

        vm.prank(owner);
        GoalVault vault = GoalVault(factory.createVault(1_000e6, unlockAt));
        _deposit(vault, 100e6);

        vm.warp(block.timestamp + 1 days + 1);
        vm.prank(owner);
        vm.expectRevert(GoalVault.GoalVaultInvalidRecipient.selector);
        vault.withdraw(50e6, address(0));
    }

    function testSafeTokenOperationsRejectFalseReturnAndRevert() external {
        FalseReturnToken falseToken = new FalseReturnToken();
        falseToken.mint(owner, 100e6);
        GoalVault falseVault = new GoalVault(owner, address(falseToken), 100e6, RULE_TIME_LOCK, uint64(block.timestamp + 1 days), 0, address(0));

        vm.startPrank(owner);
        falseToken.approve(address(falseVault), 100e6);
        vm.expectRevert();
        falseVault.deposit(10e6);
        vm.stopPrank();

        assertEq(falseVault.totalDeposited(), 0);

        RevertingToken revertingToken = new RevertingToken();
        revertingToken.mint(owner, 100e6);
        GoalVault revertingVault =
            new GoalVault(owner, address(revertingToken), 100e6, RULE_TIME_LOCK, uint64(block.timestamp + 1 days), 0, address(0));

        vm.startPrank(owner);
        revertingToken.approve(address(revertingVault), 100e6);
        vm.expectRevert(bytes("TOKEN_REVERTED"));
        revertingVault.deposit(10e6);
        vm.stopPrank();

        assertEq(revertingVault.totalDeposited(), 0);
    }

    function testReentrantTokenCannotEnterVaultDuringWithdraw() external {
        ReentrantToken token = new ReentrantToken();
        GoalVault vault = new GoalVault(owner, address(token), 1_000e6, RULE_TIME_LOCK, uint64(block.timestamp + 1 days), 0, address(0));
        token.setVault(vault);
        token.mint(owner, 1_000e6);

        vm.startPrank(owner);
        token.approve(address(vault), 1_000e6);
        vault.deposit(500e6);
        vm.stopPrank();

        token.primeReentrantDeposit(1);
        token.setAttackDuringTransfer(true);

        vm.warp(block.timestamp + 1 days + 1);
        vm.prank(owner);
        vault.withdraw(100e6, owner);

        assertTrue(token.reentryBlocked());
        assertFalse(token.reentrySucceeded());
        assertEq(vault.totalDeposited(), 500e6);
        assertEq(vault.totalWithdrawn(), 100e6);
        assertEq(token.balanceOf(address(vault)), 400e6);
    }

    function testGuardianCanRequestAgainAfterRejection() external {
        GoalVault vault = _createGuardianVault();
        _deposit(vault, 300e6);

        vm.prank(owner);
        vault.requestUnlock();

        vm.prank(guardian);
        vault.rejectUnlock();

        vm.prank(owner);
        vault.requestUnlock();

        (, , , , uint64 unlockRequestedAt, uint8 guardianDecision, uint64 guardianDecisionAt, , bool withdrawalEligible) = vault.getRuleState();
        assertEq(unlockRequestedAt, block.timestamp);
        assertEq(guardianDecision, 1);
        assertEq(guardianDecisionAt, 0);
        assertFalse(withdrawalEligible);
    }

    function testTimeLockAccountingInvariant(uint96 depositAmountSeed, uint96 withdrawAmountSeed) external {
        uint256 depositAmount = bound(uint256(depositAmountSeed), 1, 1_000_000e6);
        uint256 withdrawAmount = bound(uint256(withdrawAmountSeed), 1, depositAmount);
        uint64 unlockAt = uint64(block.timestamp + 1 days);

        usdc.mint(owner, depositAmount);

        vm.prank(owner);
        GoalVault vault = GoalVault(factory.createVault(depositAmount, unlockAt));

        _deposit(vault, depositAmount);

        vm.warp(block.timestamp + 1 days + 1);
        vm.prank(owner);
        vault.withdraw(withdrawAmount, owner);

        (, , , , uint256 totalDeposited, uint256 totalWithdrawn, uint256 vaultBalance, ) = vault.getSummary();

        assertEq(totalDeposited, depositAmount);
        assertEq(totalWithdrawn, withdrawAmount);
        assertEq(vaultBalance, depositAmount - withdrawAmount);
    }

    function _createCooldownVault(uint64 cooldownDuration) internal returns (GoalVault vault) {
        uint256 targetAmount = 1_500e6;

        vm.expectEmit(true, false, true, true, address(factory));
        emit VaultCreatedV2(owner, address(0), address(usdc), targetAmount, RULE_COOLDOWN_UNLOCK, 0, cooldownDuration, address(0), block.timestamp);

        vm.prank(owner);
        vault = GoalVault(factory.createVault(targetAmount, RULE_COOLDOWN_UNLOCK, 0, cooldownDuration, address(0)));

        (, , uint64 storedCooldownDuration, address storedGuardian, , , , , bool withdrawalEligible) = vault.getRuleState();
        assertEq(storedCooldownDuration, cooldownDuration);
        assertEq(storedGuardian, address(0));
        assertFalse(withdrawalEligible);
    }

    function _createGuardianVault() internal returns (GoalVault vault) {
        uint256 targetAmount = 900e6;

        vm.expectEmit(true, false, true, true, address(factory));
        emit VaultCreatedV2(owner, address(0), address(usdc), targetAmount, RULE_GUARDIAN_APPROVAL, 0, 0, guardian, block.timestamp);

        vm.prank(owner);
        vault = GoalVault(factory.createVault(targetAmount, RULE_GUARDIAN_APPROVAL, 0, 0, guardian));

        (, , , address storedGuardian, , uint8 guardianDecision, , , bool withdrawalEligible) = vault.getRuleState();
        assertEq(storedGuardian, guardian);
        assertEq(guardianDecision, 0);
        assertFalse(withdrawalEligible);
    }

    function _deposit(GoalVault vault, uint256 amount) internal {
        vm.startPrank(owner);
        usdc.approve(address(vault), amount);
        vault.deposit(amount);
        vm.stopPrank();
    }
}
