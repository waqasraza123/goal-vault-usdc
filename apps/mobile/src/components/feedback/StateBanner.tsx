import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useI18n } from "../../lib/i18n";
import { colors, radii, spacing } from "../../theme";
import { AppText, StatusPulse } from "../primitives";

export interface StateBannerProps {
  tone?: "warning" | "neutral";
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  pulse?: boolean;
}

export const StateBanner = ({ tone = "neutral", icon = "information-outline", label, pulse = icon === "sync" }: StateBannerProps) => {
  const { inlineDirection } = useI18n();
  const backgroundColor = tone === "warning" ? colors.warningSoft : colors.surfaceMuted;
  const iconColor = tone === "warning" ? colors.warning : colors.textSecondary;

  return (
    <View
      style={{
        flexDirection: inlineDirection(),
        alignItems: "center",
        gap: spacing[2],
        borderRadius: radii.md,
        backgroundColor,
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[3],
      }}
    >
      <StatusPulse active={pulse}>
        <MaterialCommunityIcons color={iconColor} name={icon} size={18} />
      </StatusPulse>
      <AppText size="sm" tone="secondary">
        {label}
      </AppText>
    </View>
  );
};
