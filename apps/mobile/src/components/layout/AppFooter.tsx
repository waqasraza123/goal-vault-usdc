import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

import { productConfig } from "@goal-vault/config";

import { useI18n } from "../../lib/i18n";
import { routes } from "../../lib/routing";
import { colors, radii, spacing } from "../../theme";
import { AppHeading, AppText, PageContainer } from "../primitives";

export const AppFooter = () => {
  const { inlineDirection, messages } = useI18n();
  const router = useRouter();
  const links = [
    {
      label: messages.navigation.marketingLinks.howItWorks,
      href: routes.howItWorks,
    },
    {
      label: messages.navigation.marketingLinks.security,
      href: routes.security,
    },
    {
      label: messages.common.buttons.enterMyVaults,
      href: routes.appHome,
    },
  ];

  return (
    <View style={{ borderTopWidth: 1, borderTopColor: colors.borderStrong, backgroundColor: colors.backgroundElevated }}>
      <PageContainer style={{ paddingVertical: spacing[5], gap: spacing[4] }}>
        <View style={{ gap: spacing[2] }}>
          <AppHeading size="sm" style={{ color: colors.accentStrong }}>{productConfig.name}</AppHeading>
          <AppText size="sm" tone="muted">
            {messages.footer.description.replace("Goal Vault", productConfig.name)}
          </AppText>
        </View>
        <View style={{ flexDirection: inlineDirection(), flexWrap: "wrap", gap: spacing[2] }}>
          {links.map((link) => (
            <Pressable
              key={link.label}
              onPress={() => router.push(link.href)}
              style={({ pressed }) => ({
                borderRadius: radii.pill,
                borderWidth: 1,
                borderColor: colors.borderStrong,
                backgroundColor: pressed ? colors.surfaceStrong : colors.surfaceGlass,
                paddingHorizontal: spacing[3],
                paddingVertical: spacing[2],
              })}
            >
              <AppText size="sm" style={{ color: colors.accentStrong }} weight="semibold">
                {link.label}
              </AppText>
            </Pressable>
          ))}
        </View>
      </PageContainer>
    </View>
  );
};
