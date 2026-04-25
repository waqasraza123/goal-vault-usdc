import { Platform, type ViewStyle } from "react-native";

const hexToRgb = (value: string) => {
  const normalized = value.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((segment) => `${segment}${segment}`)
          .join("")
      : normalized;
  const parsed = Number.parseInt(expanded, 16);

  return {
    red: (parsed >> 16) & 255,
    green: (parsed >> 8) & 255,
    blue: parsed & 255,
  };
};

const toRgba = (value: string, opacity: number) => {
  const { red, green, blue } = hexToRgb(value);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

export const createShadowStyle = ({
  color,
  opacity,
  radius,
  offsetY,
  elevation,
}: {
  color: string;
  opacity: number;
  radius: number;
  offsetY: number;
  elevation: number;
}): ViewStyle => {
  if (Platform.OS === "web") {
    return {
      boxShadow: `0px ${offsetY}px ${radius}px ${toRgba(color, opacity)}`,
    } as ViewStyle;
  }

  return {
    shadowColor: color,
    shadowOpacity: opacity,
    shadowRadius: radius,
    shadowOffset: {
      width: 0,
      height: offsetY,
    },
    elevation,
  };
};

export const shadows = {
  soft: createShadowStyle({
    color: "#11183d",
    opacity: 0.1,
    radius: 28,
    offsetY: 14,
    elevation: 4,
  }),
  medium: createShadowStyle({
    color: "#11183d",
    opacity: 0.14,
    radius: 38,
    offsetY: 20,
    elevation: 8,
  }),
  floating: createShadowStyle({
    color: "#11183d",
    opacity: 0.18,
    radius: 48,
    offsetY: 24,
    elevation: 11,
  }),
} as const;
