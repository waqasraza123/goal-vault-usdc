import { View } from "react-native";

import { spacing } from "../../theme";
import { AppHeading, AppText, SurfaceCard } from "../primitives";

export const AppLoadingState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <SurfaceCard tone="muted">
      <View style={{ gap: spacing[2] }}>
        <AppHeading size="md">{title}</AppHeading>
        <AppText tone="secondary">{description}</AppText>
      </View>
    </SurfaceCard>
  );
};
