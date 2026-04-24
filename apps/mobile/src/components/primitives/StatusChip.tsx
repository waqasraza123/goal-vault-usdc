import { View } from "react-native";

import { colors, createShadowStyle, radii, spacing } from "../../theme";
import { AppText } from "./AppText";

const toneMap = {
  active: { backgroundColor: colors.accentSoft, textColor: colors.accentStrong, glowColor: colors.accentGlow },
  locked: { backgroundColor: colors.warningSoft, textColor: colors.warning, glowColor: colors.warningSoft },
  unlocked: { backgroundColor: colors.positiveSoft, textColor: colors.positive, glowColor: colors.positiveGlow },
  closed: { backgroundColor: colors.surfaceStrong, textColor: colors.textSecondary, glowColor: colors.surfaceMuted },
  danger: { backgroundColor: colors.dangerSoft, textColor: colors.danger, glowColor: colors.dangerSoft },
} as const;

export interface StatusChipProps {
  label: string;
  tone?: keyof typeof toneMap;
}

export const StatusChip = ({ label, tone = "active" }: StatusChipProps) => {
  return (
    <View
      style={{
        alignSelf: "flex-start",
        borderRadius: radii.pill,
        borderWidth: 1,
        borderColor: toneMap[tone].textColor,
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[2],
        backgroundColor: toneMap[tone].backgroundColor,
        ...createShadowStyle({
          color: toneMap[tone].glowColor,
          opacity: 0.2,
          radius: 12,
          offsetY: 6,
          elevation: 1,
        }),
        elevation: 1,
      }}
    >
      <AppText size="sm" style={{ color: toneMap[tone].textColor }} weight="semibold">
        {label}
      </AppText>
    </View>
  );
};
