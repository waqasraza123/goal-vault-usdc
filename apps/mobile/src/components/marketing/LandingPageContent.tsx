import type { ReactNode } from "react";
import { PageContainer, Screen } from "../primitives";
import { spacing } from "../../theme";
import { FinalCtaSection } from "./FinalCtaSection";
import { HeroSection } from "./HeroSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { RuleProtectionSection } from "./RuleProtectionSection";
import { SecurityTrustSection } from "./SecurityTrustSection";
import { StoryPrinciplesSection } from "./StoryPrinciplesSection";

export interface LandingPageContentProps {
  connectionNotice?: ReactNode;
  showConnectionNotice?: boolean;
  onCreateVault: () => void;
  onEnterVaults: () => void;
  onReviewSecurity: () => void;
}

export const LandingPageContent = ({
  connectionNotice,
  showConnectionNotice = false,
  onCreateVault,
  onEnterVaults,
  onReviewSecurity,
}: LandingPageContentProps) => {
  return (
    <Screen contentContainerStyle={{ paddingBottom: spacing[12] }}>
      <PageContainer width="dashboard" style={{ gap: spacing[12], paddingTop: spacing[6] }}>
        <HeroSection onCreateVault={onCreateVault} onEnterVaults={onEnterVaults} onReviewSecurity={onReviewSecurity} />
        <StoryPrinciplesSection />
        <HowItWorksSection />
        <RuleProtectionSection />
        <SecurityTrustSection />
        {showConnectionNotice ? connectionNotice ?? null : null}
        <FinalCtaSection onCreateVault={onCreateVault} onEnterVaults={onEnterVaults} />
      </PageContainer>
    </Screen>
  );
};
