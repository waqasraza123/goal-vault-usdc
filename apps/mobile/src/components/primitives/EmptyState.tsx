import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors, spacing } from "../../theme";
import { AppHeading } from "./AppHeading";
import { AppText } from "./AppText";
import { SurfaceCard } from "./SurfaceCard";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  eyebrow?: string;
  highlights?: string[];
}

export const EmptyState = ({
  children,
  title,
  description,
  icon = "bullseye-arrow",
  eyebrow,
  highlights = [],
}: PropsWithChildren<EmptyStateProps>) => {
  return (
    <SurfaceCard tone="muted" style={{ alignItems: "flex-start", overflow: "hidden", backgroundColor: colors.backgroundElevated }}>
      <View style={{ gap: spacing[4], width: "100%" }}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.accentSoft,
          }}
        >
          <MaterialCommunityIcons color={colors.accentStrong} name={icon} size={28} />
        </View>
        <View style={{ gap: spacing[2] }}>
          {eyebrow ? (
            <AppText size="sm" tone="accent" weight="semibold">
              {eyebrow}
            </AppText>
          ) : null}
          <AppHeading size="md">{title}</AppHeading>
          <AppText tone="secondary">{description}</AppText>
        </View>
        {highlights.length > 0 ? (
          <View style={{ gap: spacing[3], width: "100%" }}>
            {highlights.map((highlight, index) => (
              <View
                key={highlight}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: spacing[3],
                  borderRadius: 18,
                  borderWidth: 1,
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                  padding: spacing[4],
                }}
              >
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.accentSoft,
                  }}
                >
                  <AppText size="sm" tone="accent" weight="semibold">
                    {index + 1}
                  </AppText>
                </View>
                <AppText size="sm" style={{ flex: 1 }} tone="secondary">
                  {highlight}
                </AppText>
              </View>
            ))}
          </View>
        ) : null}
        {children}
      </View>
    </SurfaceCard>
  );
};
