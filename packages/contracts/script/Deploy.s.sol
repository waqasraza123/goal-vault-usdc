pragma solidity ^0.8.30;

import {Script} from "forge-std/Script.sol";
import {GoalVaultFactory} from "../src/GoalVaultFactory.sol";

contract DeployGoalVaultFactoryScript is Script {
    error DeployGoalVaultFactoryInvalidUsdc();

    function run() external returns (GoalVaultFactory factory) {
        address usdc = vm.envAddress("USDC_ADDRESS");
        uint256 deployerPrivateKey = vm.envUint("CONTRACT_DEPLOYER_PRIVATE_KEY");

        if (usdc == address(0)) revert DeployGoalVaultFactoryInvalidUsdc();

        vm.startBroadcast(deployerPrivateKey);
        factory = new GoalVaultFactory(usdc);
        vm.stopBroadcast();
    }

    function deploy(address usdc) external returns (GoalVaultFactory factory) {
        if (usdc == address(0)) revert DeployGoalVaultFactoryInvalidUsdc();

        factory = new GoalVaultFactory(usdc);
    }
}
