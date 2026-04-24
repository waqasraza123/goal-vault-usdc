import { Stack } from "expo-router";
import { View } from "react-native";

import { useWalletConnection } from "../hooks/useWalletConnection";
import { useI18n } from "../lib/i18n";
import { GuidedStepsCard } from "../components/feedback";
import { MarketingShell } from "../components/layout";
import { WalletStatusCard } from "../components/layout/WalletStatusCard";
import { FinalCtaSection, HeroSection, HowItWorksSection, SecurityTrustSection } from "../components/marketing";
import { PageContainer, Screen } from "../components/primitives";
import { spacing } from "../theme";

export default function LandingScreen() {
  const { connectionState } = useWalletConnection();
  const { messages } = useI18n();

  return (
    <MarketingShell>
      <Stack.Screen options={{ title: "Goal Vault" }} />
      <Screen contentContainerStyle={{ paddingBottom: spacing[12] }}>
        <PageContainer width="dashboard" style={{ gap: spacing[12], paddingTop: spacing[6] }}>
          <HeroSection />
          <GuidedStepsCard
            description={messages.landing.demoPathDescription}
            eyebrow={messages.landing.demoPathEyebrow}
            icon="play-circle-outline"
            steps={messages.landing.demoPathSteps}
            title={messages.landing.demoPathTitle}
          />
          {connectionState.status !== "ready" ? <WalletStatusCard /> : null}
          <HowItWorksSection />
          <SecurityTrustSection />
          <FinalCtaSection />
          <View />
        </PageContainer>
      </Screen>
    </MarketingShell>
  );
}
