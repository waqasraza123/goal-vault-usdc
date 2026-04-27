import type { ComponentProps, PropsWithChildren } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { useI18n } from "../../lib/i18n";
import { colors, radii, spacing } from "../../theme";
import { AppHeading, AppText, MotionView, SurfaceCard } from "../primitives";

export interface FeedbackStatusCardProps {
  title: string;
  description: string;
  eyebrow?: string;
  icon?: ComponentProps<typeof MaterialCommunityIcons>["name"];
  tone?: "accent" | "positive" | "warning" | "danger" | "neutral";
}

export const FeedbackStatusCard = ({
  children,
  title,
  description,
  eyebrow,
  icon = "information-outline",
  tone = "accent",
}: PropsWithChildren<FeedbackStatusCardProps>) => {
  const { inlineDirection } = useI18n();
  const isDanger = tone === "danger";
  const isWarning = tone === "warning";
  const isPositive = tone === "positive";
  const iconColor = isDanger ? colors.danger : isWarning ? colors.warning : isPositive ? colors.positive : colors.accentStrong;
  const iconBackgroundColor = isDanger ? colors.dangerSoft : isWarning ? colors.warningSoft : isPositive ? colors.positiveSoft : colors.accentSoft;
  const surfaceTone = isDanger || isWarning ? "muted" : "accent";
  const accentColor = iconColor;

  return (
    <SurfaceCard accentColor={accentColor} level="floating" tone={surfaceTone} style={{ padding: spacing[5] }}>
      <MotionView style={{ flexDirection: inlineDirection(), alignItems: "flex-start", gap: spacing[3] }} preset="hero" intensity="emphasis">
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: radii.md,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: iconBackgroundColor,
            borderWidth: 1,
            borderColor: accentColor,
          }}
        >
          <MaterialCommunityIcons color={iconColor} name={icon} size={24} />
        </View>
        <View style={{ flex: 1, gap: spacing[2] }}>
          {eyebrow ? (
            <AppText size="sm" style={{ color: iconColor }} weight="semibold">
              {eyebrow}
            </AppText>
          ) : null}
          <AppHeading size="md">{title}</AppHeading>
          <AppText tone="secondary">{description}</AppText>
        </View>
      </MotionView>
      {children}
    </SurfaceCard>
  );
};
