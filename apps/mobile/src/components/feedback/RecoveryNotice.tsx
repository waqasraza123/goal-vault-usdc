import type { ComponentProps } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import { spacing } from "../../theme";
import { PrimaryButton, SecondaryButton } from "../primitives";
import { FeedbackStatusCard } from "./FeedbackStatusCard";

export const RecoveryNotice = ({
  title,
  description,
  primaryAction,
  secondaryAction,
}: {
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onPress: () => void;
    icon?: ComponentProps<typeof MaterialCommunityIcons>["name"];
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
    icon?: ComponentProps<typeof MaterialCommunityIcons>["name"];
  };
}) => {
  return (
    <FeedbackStatusCard description={description} icon="restore-alert" title={title} tone="warning">
      {primaryAction || secondaryAction ? (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing[3] }}>
          {primaryAction ? (
            <PrimaryButton
              icon={primaryAction.icon ?? "refresh"}
              label={primaryAction.label}
              onPress={primaryAction.onPress}
            />
          ) : null}
          {secondaryAction ? (
            <SecondaryButton
              icon={secondaryAction.icon ?? "arrow-left"}
              label={secondaryAction.label}
              onPress={secondaryAction.onPress}
            />
          ) : null}
        </View>
      ) : null}
    </FeedbackStatusCard>
  );
};
