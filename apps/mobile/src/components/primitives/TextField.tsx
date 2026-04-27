import { forwardRef, useState } from "react";
import { TextInput, View, type TextInputProps, type TextStyle } from "react-native";

import { useI18n } from "../../lib/i18n";
import { colors, createShadowStyle, radii, spacing, typography } from "../../theme";
import { AppText } from "./AppText";

export interface TextFieldProps extends TextInputProps {
  label: string;
  helperText?: string;
  errorMessage?: string;
}

export const TextField = forwardRef<TextInput, TextFieldProps>(
  ({ label, helperText, errorMessage, multiline, onBlur, onFocus, style, ...props }, ref) => {
    const { direction, textAlignStart } = useI18n();
    const [isFocused, setIsFocused] = useState(false);
    const borderColor = errorMessage ? colors.danger : isFocused ? colors.accentStrong : colors.border;
    const focusShadowStyle = createShadowStyle({
      color: errorMessage ? colors.danger : colors.accentStrong,
      opacity: isFocused || errorMessage ? 0.1 : 0,
      radius: 16,
      offsetY: 8,
      elevation: isFocused || errorMessage ? 2 : 0,
    }) as TextStyle;

    return (
      <View style={{ gap: spacing[2] }}>
        {label ? (
          <AppText size="sm" tone="secondary" weight="medium">
            {label}
          </AppText>
        ) : null}
        <TextInput
          ref={ref}
          multiline={multiline}
          placeholderTextColor={colors.textMuted}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          style={[
            {
              minHeight: multiline ? 124 : 52,
              borderRadius: radii.md,
              borderWidth: 1,
              borderColor,
              backgroundColor: colors.surface,
              color: colors.textPrimary,
              paddingHorizontal: spacing[4],
              paddingVertical: spacing[4],
              fontSize: typography.size.md,
              lineHeight: typography.lineHeight.md,
              textAlign: textAlignStart,
              textAlignVertical: multiline ? "top" : "center",
              writingDirection: direction,
            },
            focusShadowStyle,
            style,
          ]}
          {...props}
        />
        {errorMessage ? (
          <AppText size="sm" tone="danger">
            {errorMessage}
          </AppText>
        ) : helperText ? (
          <AppText size="sm" tone="muted">
            {helperText}
          </AppText>
        ) : null}
      </View>
    );
  },
);

TextField.displayName = "TextField";
