import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { useI18n } from "../../lib/i18n";
import { colors, radii, spacing } from "../../theme";
import { AppText, MotionView } from "../primitives";
import { FeedbackStatusCard } from "./FeedbackStatusCard";

export interface TransactionStatusDetail {
  label: string;
  value: string;
}

export const TransactionStatusCard = ({
  title,
  description,
  eyebrow,
  tone = "accent",
  details = [],
}: {
  title: string;
  description: string;
  eyebrow?: string;
  tone?: "accent" | "muted" | "default";
  details?: TransactionStatusDetail[];
}) => {
  const { inlineDirection, messages } = useI18n();
  const statusTone = tone === "muted" ? "danger" : tone === "default" ? "neutral" : "accent";
  const statusIcon = tone === "muted" ? "alert-circle-outline" : "progress-clock";

  return (
    <FeedbackStatusCard
      description={description}
      eyebrow={eyebrow ?? messages.common.labels.transactionStatus}
      icon={statusIcon}
      title={title}
      tone={statusTone}
    >
      {details.map((detail, index) => (
        <MotionView
          key={detail.label}
          delay={80 + index * 45}
          style={{
            flexDirection: inlineDirection(),
            alignItems: "flex-start",
            borderRadius: radii.lg,
            borderWidth: 1,
            borderColor: colors.borderStrong,
            backgroundColor: colors.backgroundElevated,
            padding: spacing[4],
            gap: spacing[3],
          }}
        >
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: radii.sm,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.accentSoft,
            }}
          >
            <MaterialCommunityIcons color={colors.accentStrong} name="identifier" size={18} />
          </View>
          <View style={{ flex: 1, gap: spacing[1] }}>
            <AppText size="sm" tone="secondary">
              {detail.label}
            </AppText>
            <AppText weight="semibold">{detail.value}</AppText>
          </View>
        </MotionView>
      ))}
    </FeedbackStatusCard>
  );
};
