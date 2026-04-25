import type { ReactNode } from "react";
import { View } from "react-native";

import { useAdaptiveLayout } from "../../hooks/useAdaptiveLayout";
import { colors, radii, spacing } from "../../theme";
import { AppHeading, AppText, MotionView } from "../primitives";

export interface ScreenHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const ScreenHeader = ({ eyebrow, title, description, action }: ScreenHeaderProps) => {
  const adaptiveLayout = useAdaptiveLayout();

  return (
    <View
      style={{
        gap: spacing[3],
        flexDirection: adaptiveLayout.useSplitLayout && action ? "row" : "column",
        alignItems: adaptiveLayout.useSplitLayout && action ? "flex-end" : "flex-start",
        justifyContent: "space-between",
      }}
    >
      <MotionView intensity="structural" style={{ flex: 1, gap: spacing[3] }}>
        {eyebrow ? (
          <View
            style={{
              alignSelf: "flex-start",
              borderRadius: radii.pill,
              borderWidth: 1,
              borderColor: colors.borderStrong,
              backgroundColor: colors.accentSoft,
              paddingHorizontal: spacing[3],
              paddingVertical: spacing[2],
            }}
          >
            <AppText size="sm" tone="accent" weight="semibold">
              {eyebrow}
            </AppText>
          </View>
        ) : null}
        <View style={{ gap: spacing[2] }}>
          <AppHeading size="xl">{title}</AppHeading>
          {description ? <AppText tone="secondary">{description}</AppText> : null}
        </View>
      </MotionView>
      {action ? (
        <MotionView delay={80} intensity="subtle">
          {action}
        </MotionView>
      ) : null}
    </View>
  );
};
