import type { ComponentProps } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { getStaggerDelay } from "../../lib/motion/list-motion";
import { useI18n } from "../../lib/i18n";
import { colors, radii, spacing } from "../../theme";
import type { VaultActivityEvent } from "../../types";
import { AppHeading, AppText, MotionView, SecondaryButton, SurfaceCard } from "../primitives";

export interface VaultActivityPreviewProps {
  events: VaultActivityEvent[];
  onOpenTimeline?: () => void;
}

const getActivityIcon = (type: VaultActivityEvent["type"]): ComponentProps<typeof MaterialCommunityIcons>["name"] => {
  if (type === "deposit") {
    return "plus-circle-outline";
  }

  if (type === "withdrawal") {
    return "arrow-up-right";
  }

  if (type === "created") {
    return "shield-lock-outline";
  }

  if (type === "milestone") {
    return "flag-checkered";
  }

  return "timeline-check-outline";
};

export const VaultActivityPreview = ({ events, onOpenTimeline }: VaultActivityPreviewProps) => {
  const { inlineDirection, messages } = useI18n();

  return (
    <SurfaceCard style={{ padding: spacing[5] }}>
      <View style={{ flexDirection: inlineDirection(), justifyContent: "space-between", alignItems: "center", gap: spacing[3] }}>
        <View style={{ flexDirection: inlineDirection(), alignItems: "center", gap: spacing[3], flex: 1 }}>
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: radii.md,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.accentSoft,
              borderWidth: 1,
              borderColor: colors.borderStrong,
            }}
          >
            <MaterialCommunityIcons color={colors.accentStrong} name="history" size={22} />
          </View>
          <AppHeading size="md">{messages.common.labels.recentActivity}</AppHeading>
        </View>
        {onOpenTimeline ? (
          <SecondaryButton icon="arrow-right" label={messages.common.buttons.openActivity} onPress={onOpenTimeline} />
        ) : null}
      </View>

      {events.length === 0 ? (
        <View
          style={{
            borderRadius: radii.lg,
            borderWidth: 1,
            borderColor: colors.borderStrong,
            backgroundColor: colors.surfaceMuted,
            padding: spacing[4],
          }}
        >
          <AppText tone="secondary">{messages.vaults.activityEmpty}</AppText>
        </View>
      ) : (
        <View style={{ gap: spacing[3] }}>
          {events.map((event, index) => (
            <MotionView
              key={event.id}
              delay={getStaggerDelay(index)}
              style={{
                flexDirection: inlineDirection(),
                gap: spacing[3],
                borderRadius: radii.lg,
                borderWidth: 1,
                borderColor: colors.borderStrong,
                backgroundColor: colors.surfaceGlass,
                padding: spacing[4],
              }}
            >
              <View
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: radii.sm,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: event.type === "deposit" ? colors.positiveSoft : colors.accentSoft,
                }}
              >
                <MaterialCommunityIcons
                  color={event.type === "deposit" ? colors.positive : colors.accentStrong}
                  name={getActivityIcon(event.type)}
                  size={18}
                />
              </View>
              <View style={{ flex: 1, gap: spacing[1] }}>
                <AppText weight="semibold">{event.title}</AppText>
                <AppText tone="secondary">{event.subtitle}</AppText>
                <AppText size="sm" tone="muted">
                  {new Date(event.occurredAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </AppText>
              </View>
            </MotionView>
          ))}
        </View>
      )}
    </SurfaceCard>
  );
};
