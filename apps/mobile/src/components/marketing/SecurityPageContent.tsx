import { PageContainer, Screen } from "../primitives";
import { useI18n } from "../../lib/i18n";
import { getSecurityPageModel } from "../../lib/public/marketing-content";
import { spacing } from "../../theme";
import { FinalCtaSection } from "./FinalCtaSection";
import { PublicRouteHero } from "./PublicRouteHero";
import { SecurityDisclosureSection } from "./SecurityDisclosureSection";
import { SecurityTrustSection } from "./SecurityTrustSection";

export const SecurityPageContent = ({
  onCreateVault,
  onEnterVaults,
  onSeeHowItWorks,
}: {
  onCreateVault: () => void;
  onEnterVaults: () => void;
  onSeeHowItWorks: () => void;
}) => {
  const { locale, messages } = useI18n();
  const model = getSecurityPageModel(locale);

  return (
    <Screen contentContainerStyle={{ paddingBottom: spacing[12] }}>
      <PageContainer width="dashboard" style={{ gap: spacing[10], paddingTop: spacing[6] }}>
        <PublicRouteHero
          eyebrow={messages.pages.security.eyebrow}
          title={messages.pages.security.title}
          description={messages.pages.security.description}
          highlights={model.highlightItems}
          primaryActionLabel={model.primaryAction.label}
          onPrimaryAction={onCreateVault}
          secondaryActionLabel={model.secondaryAction.label}
          onSecondaryAction={onSeeHowItWorks}
          insightEyebrow={messages.landing.securityEyebrow}
          insightTitle={messages.landing.securityTitle}
          insightPoints={model.insightPoints}
        />
        <SecurityDisclosureSection />
        <SecurityTrustSection />
        <FinalCtaSection onCreateVault={onCreateVault} onEnterVaults={onEnterVaults} />
      </PageContainer>
    </Screen>
  );
};
