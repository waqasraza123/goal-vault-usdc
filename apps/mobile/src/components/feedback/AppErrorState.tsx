import { View } from "react-native";

import { spacing } from "../../theme";
import { AppHeading, AppText, PrimaryButton, SecondaryButton, SurfaceCard } from "../primitives";

export const AppErrorState = ({
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
    icon?: string;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
    icon?: string;
  };
}) => {
  return (
    <SurfaceCard tone="muted">
      <View style={{ gap: spacing[2] }}>
        <AppHeading size="md">{title}</AppHeading>
        <AppText tone="secondary">{description}</AppText>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing[3] }}>
        {primaryAction ? (
          <PrimaryButton
            icon={(primaryAction.icon as never | undefined) ?? "refresh"}
            label={primaryAction.label}
            onPress={primaryAction.onPress}
          />
        ) : null}
        {secondaryAction ? (
          <SecondaryButton
            icon={(secondaryAction.icon as never | undefined) ?? "arrow-left"}
            label={secondaryAction.label}
            onPress={secondaryAction.onPress}
          />
        ) : null}
      </View>
    </SurfaceCard>
  );
};
