import type { ComponentProps } from "react";
import { Pressable, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useWalletConnection } from "../../hooks/useWalletConnection";
import { useI18n } from "../../lib/i18n";
import { formatWalletAddress } from "../../lib/blockchain/wallet/helpers";
import { colors, radii, spacing } from "../../theme";
import { AppText, SecondaryButton } from "../primitives";
import { NetworkBadge } from "./NetworkBadge";

export interface WalletEntryPlaceholderProps {
  compact?: boolean;
}

export const WalletEntryPlaceholder = ({ compact = false }: WalletEntryPlaceholderProps) => {
  const { connect, connectionState, switchNetwork } = useWalletConnection();
  const { inlineDirection, messages } = useI18n();

  const compactControl = ({
    icon,
    label,
    onPress,
    disabled = false,
    tone = "default",
  }: {
    icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
    label: string;
    onPress?: () => void;
    disabled?: boolean;
    tone?: "default" | "positive" | "warning";
  }) => (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        maxWidth: 154,
        borderRadius: radii.md,
        borderWidth: 1,
        borderColor: tone === "warning" ? colors.warning : tone === "positive" ? colors.positive : colors.borderStrong,
        backgroundColor:
          tone === "warning"
            ? colors.warningSoft
            : tone === "positive"
              ? colors.positiveSoft
              : pressed
                ? colors.surfaceStrong
                : colors.surface,
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[2],
        opacity: disabled ? 0.72 : 1,
      })}
    >
      <View style={{ flexDirection: inlineDirection(), alignItems: "center", gap: spacing[2] }}>
        <MaterialCommunityIcons
          color={tone === "positive" ? colors.positive : tone === "warning" ? colors.warning : colors.accentStrong}
          name={icon}
          size={16}
        />
        <AppText numberOfLines={1} size="xs" tone="secondary" weight="semibold">
          {label}
        </AppText>
      </View>
    </Pressable>
  );

  if (connectionState.status === "ready" && connectionState.session?.address) {
    if (compact) {
      return compactControl({
        icon: "shield-check-outline",
        label: formatWalletAddress(connectionState.session.address),
        tone: "positive",
      });
    }

    return (
      <View
        style={{
          flexDirection: inlineDirection(),
          alignItems: "center",
          gap: spacing[2],
          borderRadius: radii.pill,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          paddingHorizontal: spacing[4],
          paddingVertical: spacing[2],
        }}
      >
        <MaterialCommunityIcons color={colors.positive} name="shield-check-outline" size={18} />
        <NetworkBadge label={connectionState.session.chain?.shortName ?? messages.common.networkBase} />
        <AppText size="sm" tone="secondary" weight="semibold">
          {formatWalletAddress(connectionState.session.address)}
        </AppText>
      </View>
    );
  }

  if (connectionState.status === "unsupportedNetwork") {
    if (compact) {
      return compactControl({
        icon: "swap-horizontal",
        label: messages.common.unsupported,
        onPress: () => void switchNetwork(),
        tone: "warning",
      });
    }

    return <SecondaryButton icon="swap-horizontal" label={messages.common.buttons.switchNetwork} onPress={() => void switchNetwork()} />;
  }

  if (connectionState.status === "connecting") {
    if (compact) {
      return compactControl({
        icon: "timer-sand",
        label: messages.common.buttons.connecting,
        disabled: true,
      });
    }

    return <SecondaryButton icon="timer-sand" label={messages.common.buttons.connecting} />;
  }

  if (connectionState.status === "walletUnavailable") {
    if (compact) {
      return compactControl({
        icon: "wallet-outline",
        label: messages.common.wallet,
        disabled: true,
      });
    }

    return <SecondaryButton disabled icon="wallet-outline" label={messages.common.buttons.walletSetupPending} />;
  }

  if (compact) {
    return compactControl({
      icon: "wallet-outline",
      label: messages.common.wallet,
      onPress: () => void connect(),
    });
  }

  return <SecondaryButton icon="wallet-outline" label={messages.common.buttons.connectWallet} onPress={() => void connect()} />;
};
