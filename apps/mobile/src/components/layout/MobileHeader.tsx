import { Link, type Href } from "expo-router";
import { Pressable, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { productConfig } from "@goal-vault/config";

import { useI18n } from "../../lib/i18n";
import { routes } from "../../lib/routing";
import { colors, radii, spacing } from "../../theme";
import { AppHeading, AppText, PageContainer } from "../primitives";
import type { HeaderLink } from "./DesktopHeader";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { WalletEntryPlaceholder } from "./WalletEntryPlaceholder";

export interface MobileHeaderProps {
  links: HeaderLink[];
  ctaHref: Href;
  ctaLabel: string;
}

export const MobileHeader = ({ links, ctaHref, ctaLabel }: MobileHeaderProps) => {
  const { getDirectionalIcon, inlineDirection, messages } = useI18n();

  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: colors.backgroundElevated }}>
      <View className="border-b border-slate-200 bg-white">
        <PageContainer>
          <View style={{ gap: spacing[3], paddingBottom: spacing[3], paddingTop: spacing[2] }}>
            <View style={{ flexDirection: inlineDirection(), alignItems: "center" }}>
              <Link href={routes.landing} asChild>
                <Pressable>
                  <View style={{ gap: spacing[1] }}>
                    <AppHeading size="sm" style={{ color: colors.textPrimary }}>
                      {productConfig.shortName}
                    </AppHeading>
                    <AppText numberOfLines={1} size="xs" tone="muted">
                      {messages.navigation.mobileTagline}
                    </AppText>
                  </View>
                </Pressable>
              </Link>
            </View>
            <View style={{ flexDirection: inlineDirection(), flexWrap: "wrap", gap: spacing[2], alignItems: "center" }}>
              <LanguageSwitcher compact />
              <WalletEntryPlaceholder compact />
            </View>
            <View style={{ flexDirection: inlineDirection(), flexWrap: "wrap", gap: spacing[2] }}>
              {links.map((link) => (
                <Link key={link.label} href={link.href} asChild>
                  <Pressable
                    className="rounded-2xl border border-slate-200 bg-white px-3 py-2 active:bg-slate-100"
                    style={({ pressed }) => ({
                      flexDirection: inlineDirection(),
                      alignItems: "center",
                      gap: spacing[2],
                      borderRadius: radii.md,
                      backgroundColor: pressed ? colors.surfaceStrong : undefined,
                    })}
                  >
                    <MaterialCommunityIcons color={colors.textPrimary} name={getDirectionalIcon("arrow-top-right")} size={16} />
                    <AppText size="sm" weight="semibold">
                      {link.label}
                    </AppText>
                  </Pressable>
                </Link>
              ))}
              <Link href={ctaHref} asChild>
                <Pressable
                  className="rounded-2xl bg-blue-600 px-4 py-2 active:bg-blue-700"
                  style={({ pressed }) => ({
                    borderRadius: radii.md,
                    backgroundColor: pressed ? colors.accentStrong : colors.accent,
                  })}
                >
                  <AppText numberOfLines={1} size="sm" style={{ color: colors.white }} weight="semibold">
                    {ctaLabel}
                  </AppText>
                </Pressable>
              </Link>
            </View>
          </View>
        </PageContainer>
      </View>
    </SafeAreaView>
  );
};
