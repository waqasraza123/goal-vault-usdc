import { Pressable, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors, radii, spacing } from "../../theme";
import { useI18n, type AppLocale } from "../../lib/i18n";
import { marketingLanguageOptions } from "../../lib/public/marketing-experience";
import { AppText } from "../primitives";

export interface LanguageSwitcherProps {
  compact?: boolean;
}

export const LanguageSwitcher = ({ compact = false }: LanguageSwitcherProps) => {
  const { inlineDirection, locale, messages, setLocale } = useI18n();

  return (
    <View
      className={compact ? "self-start rounded-2xl bg-slate-100 p-1" : undefined}
      style={{
        flexDirection: inlineDirection(),
        alignItems: "center",
        gap: compact ? spacing[1] : spacing[2],
        borderRadius: compact ? radii.md : radii.pill,
        backgroundColor: compact ? undefined : colors.surfaceMuted,
        padding: compact ? undefined : 4,
      }}
    >
      <View
        className={compact ? "px-2" : undefined}
        style={{
          flexDirection: inlineDirection(),
          alignItems: "center",
          gap: compact ? spacing[1] : spacing[2],
          paddingHorizontal: compact ? undefined : spacing[2],
        }}
      >
        <MaterialCommunityIcons color={colors.accentStrong} name="translate" size={18} />
        <AppText numberOfLines={1} size={compact ? "xs" : "sm"} tone="secondary" weight="medium">
          {messages.localeSwitchLabel}
        </AppText>
      </View>

      <View
        style={{
          flexDirection: inlineDirection(),
          alignItems: "center",
          gap: spacing[1],
        }}
      >
        {marketingLanguageOptions.map((option) => {
          const isActive = option.locale === locale;

          return (
            <Pressable
              key={option.locale}
              accessibilityRole="button"
              onPress={() => setLocale(option.locale as AppLocale)}
              className={compact ? "rounded-xl px-3 py-2 active:bg-white" : undefined}
              style={({ pressed }) => ({
                borderRadius: compact ? radii.sm : radii.pill,
                backgroundColor: isActive ? colors.accent : pressed ? colors.surfaceStrong : compact ? "transparent" : colors.surface,
                paddingHorizontal: compact ? undefined : spacing[3],
                paddingVertical: compact ? undefined : spacing[2],
              })}
            >
              <AppText size={compact ? "xs" : "sm"} style={{ color: isActive ? colors.white : colors.textPrimary }} weight="semibold">
                {option.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
