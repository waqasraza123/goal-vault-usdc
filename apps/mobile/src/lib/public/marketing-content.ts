import type { Href } from "expo-router";

import { getLocaleMessages, type AppLocale } from "../i18n/messages";
import { routes } from "../routing";

type MarketingMessages = ReturnType<typeof getLocaleMessages>;
type MarketingIconName = string;

export type MarketingActionId = "createVault" | "enterVaults" | "howItWorks" | "security";

export interface MarketingActionModel {
  id: MarketingActionId;
  label: string;
  href: Href;
}

export interface MarketingHighlightModel {
  title: string;
  description: string;
  icon: MarketingIconName;
}

export interface MarketingRuleModel {
  title: string;
  description: string;
  eyebrow: string;
  icon: MarketingIconName;
}

export interface LandingPageModel {
  heroActions: MarketingActionModel[];
  secondaryAction: MarketingActionModel;
  storyCards: MarketingHighlightModel[];
  ruleCards: MarketingRuleModel[];
}

export interface MarketingRouteModel {
  primaryAction: MarketingActionModel;
  secondaryAction: MarketingActionModel;
  highlightItems: string[];
  insightPoints: string[];
}

const getMarketingActionMap = (messages: MarketingMessages): Record<MarketingActionId, MarketingActionModel> => ({
  createVault: {
    id: "createVault",
    label: messages.common.buttons.createVault,
    href: routes.createVault,
  },
  enterVaults: {
    id: "enterVaults",
    label: messages.common.buttons.enterMyVaults,
    href: routes.appHome,
  },
  howItWorks: {
    id: "howItWorks",
    label: messages.common.buttons.seeHowItWorks,
    href: routes.howItWorks,
  },
  security: {
    id: "security",
    label: messages.common.buttons.reviewSecurity,
    href: routes.security,
  },
});

export const getLandingPageModel = (locale: AppLocale): LandingPageModel => {
  const messages = getLocaleMessages(locale);
  const actions = getMarketingActionMap(messages);

  return {
    heroActions: [actions.createVault, actions.enterVaults],
    secondaryAction: actions.howItWorks,
    storyCards: messages.landing.storyCards.map((card, index) => ({
      ...card,
      icon: index === 0 ? "safe-square-outline" : index === 1 ? "shield-lock-outline" : "currency-usd",
    })),
    ruleCards: messages.landing.ruleCards.map((card, index) => ({
      ...card,
      icon:
        index === 0
          ? "calendar-lock-outline"
          : index === 1
            ? "timer-sand"
            : "account-supervisor-circle-outline",
    })),
  };
};

export const getHowItWorksPageModel = (locale: AppLocale): MarketingRouteModel => {
  const messages = getLocaleMessages(locale);
  const actions = getMarketingActionMap(messages);

  return {
    primaryAction: actions.createVault,
    secondaryAction: actions.security,
    highlightItems: messages.pages.howItWorks.highlights,
    insightPoints: messages.pages.howItWorks.insightPoints,
  };
};

export const getSecurityPageModel = (locale: AppLocale): MarketingRouteModel => {
  const messages = getLocaleMessages(locale);
  const actions = getMarketingActionMap(messages);

  return {
    primaryAction: actions.createVault,
    secondaryAction: actions.howItWorks,
    highlightItems: messages.pages.security.highlights,
    insightPoints: messages.pages.security.insightPoints,
  };
};
