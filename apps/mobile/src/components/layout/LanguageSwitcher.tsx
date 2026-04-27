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
      style={{
        flexDirection: inlineDirection(),
        alignItems: "center",
        gap: compact ? spacing[1] : spacing[2],
        borderRadius: compact ? radii.md : radii.pill,
        borderWidth: 1,
        borderColor: compact ? colors.borderStrong : colors.border,
        backgroundColor: colors.surfaceMuted,
        padding: 4,
      }}
    >
      <View
        style={{
          flexDirection: inlineDirection(),
          alignItems: "center",
          gap: compact ? spacing[1] : spacing[2],
          paddingHorizontal: spacing[2],
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
              accessibilityState={{ selected: isActive }}
              onPress={() => setLocale(option.locale as AppLocale)}
              style={({ pressed }) => ({
                borderRadius: compact ? radii.sm : radii.pill,
                backgroundColor: isActive ? colors.accent : pressed ? colors.surfaceStrong : compact ? "transparent" : colors.surface,
                paddingHorizontal: spacing[3],
                paddingVertical: spacing[2],
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
