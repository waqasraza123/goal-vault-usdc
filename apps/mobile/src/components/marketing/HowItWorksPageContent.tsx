import { PageContainer, Screen } from "../primitives";
import { useI18n } from "../../lib/i18n";
import { getHowItWorksPageModel } from "../../lib/public/marketing-content";
import { spacing } from "../../theme";
import { FinalCtaSection } from "./FinalCtaSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { PublicRouteHero } from "./PublicRouteHero";
import { RuleProtectionSection } from "./RuleProtectionSection";

export const HowItWorksPageContent = ({
  onCreateVault,
  onEnterVaults,
  onReviewSecurity,
}: {
  onCreateVault: () => void;
  onEnterVaults: () => void;
  onReviewSecurity: () => void;
}) => {
  const { locale, messages } = useI18n();
  const model = getHowItWorksPageModel(locale);

  return (
    <Screen contentContainerStyle={{ paddingBottom: spacing[12] }}>
      <PageContainer width="dashboard" style={{ gap: spacing[10], paddingTop: spacing[6] }}>
        <PublicRouteHero
          eyebrow={messages.pages.howItWorks.eyebrow}
          title={messages.pages.howItWorks.title}
          description={messages.pages.howItWorks.description}
          highlights={model.highlightItems}
          primaryActionLabel={model.primaryAction.label}
          onPrimaryAction={onCreateVault}
          secondaryActionLabel={model.secondaryAction.label}
          onSecondaryAction={onReviewSecurity}
          insightEyebrow={messages.landing.howItWorksEyebrow}
          insightTitle={messages.landing.howItWorksTitle}
          insightPoints={model.insightPoints}
        />
        <HowItWorksSection />
        <RuleProtectionSection />
        <FinalCtaSection onCreateVault={onCreateVault} onEnterVaults={onEnterVaults} />
      </PageContainer>
    </Screen>
  );
};
