import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { useI18n } from "../../lib/i18n";
import { colors, radii, spacing } from "../../theme";
import { AppText } from "../primitives";

export interface StepPillsProps {
  currentStep: number;
  steps: string[];
}

export const StepPills = ({ currentStep, steps }: StepPillsProps) => {
  const { inlineDirection } = useI18n();

  return (
    <View style={{ flexDirection: inlineDirection(), flexWrap: "wrap", gap: spacing[2] }}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isComplete = index < currentStep;
        const indicatorBackground = isActive ? colors.accentStrong : isComplete ? colors.positive : colors.surfaceMuted;
        const indicatorTextColor = isActive || isComplete ? colors.white : colors.textSecondary;
        const pillBackground = isActive ? colors.accentSoft : isComplete ? colors.positiveSoft : colors.surface;
        const pillBorder = isActive ? colors.accent : isComplete ? colors.positive : colors.border;
        const labelColor = isActive ? colors.accentStrong : isComplete ? colors.positive : colors.textSecondary;

        return (
          <View
            key={step}
            style={{
              minHeight: 42,
              paddingHorizontal: spacing[3],
              paddingVertical: spacing[2],
              borderRadius: radii.pill,
              backgroundColor: pillBackground,
              borderWidth: 1,
              borderColor: pillBorder,
              flexDirection: inlineDirection(),
              alignItems: "center",
              gap: spacing[2],
            }}
          >
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: radii.pill,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: indicatorBackground,
              }}
            >
              {isComplete ? (
                <MaterialCommunityIcons color={colors.white} name="check" size={14} />
              ) : (
                <AppText size="xs" style={{ color: indicatorTextColor }} weight="semibold">
                  {index + 1}
                </AppText>
              )}
            </View>
            <AppText size="sm" style={{ color: labelColor }} weight="semibold">
              {step}
            </AppText>
          </View>
        );
      })}
    </View>
  );
};
