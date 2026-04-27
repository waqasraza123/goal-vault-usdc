import { type Href, usePathname } from "expo-router";

import { routes } from "../../lib/routing";
import { useI18n } from "../../lib/i18n";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { DesktopHeader, type HeaderLink } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";

export interface TopNavigationProps {
  area: "marketing" | "app";
}

export const TopNavigation = ({ area }: TopNavigationProps) => {
  const breakpoint = useBreakpoint();
  const pathname = usePathname();
  const { messages } = useI18n();
  const isRouteActive = (href: Href) => {
    const route = href.toString();

    if (route === routes.appHome) {
      return pathname === route || (pathname.startsWith(`${route}/`) && pathname !== routes.createVault.toString());
    }

    return pathname === route;
  };
  const links: HeaderLink[] =
    area === "marketing"
      ? [
          {
            label: messages.navigation.marketingLinks.howItWorks,
            href: routes.howItWorks,
            icon: "compass-outline",
            isActive: isRouteActive(routes.howItWorks),
          },
          {
            label: messages.navigation.marketingLinks.security,
            href: routes.security,
            icon: "shield-check-outline",
            isActive: isRouteActive(routes.security),
          },
        ]
      : [
          {
            label: messages.navigation.appLinks.home,
            href: routes.appHome,
            icon: "view-dashboard-outline",
            isActive: isRouteActive(routes.appHome),
          },
          {
            label: messages.navigation.appLinks.create,
            href: routes.createVault,
            icon: "plus-circle-outline",
            isActive: isRouteActive(routes.createVault),
          },
          {
            label: messages.navigation.appLinks.activity,
            href: routes.activity,
            icon: "history",
            isActive: isRouteActive(routes.activity),
          },
          {
            label: messages.navigation.appLinks.support,
            href: routes.support,
            icon: "lifebuoy",
            isActive: isRouteActive(routes.support),
          },
        ];
  const ctaHref = area === "marketing" ? routes.appHome : routes.createVault;
  const ctaLabel = area === "marketing" ? messages.navigation.marketingCta : messages.navigation.appCta;

  if (breakpoint.isCompact) {
    return <MobileHeader ctaHref={ctaHref} ctaLabel={ctaLabel} links={links} />;
  }

  return <DesktopHeader ctaHref={ctaHref} ctaLabel={ctaLabel} links={links} />;
};
