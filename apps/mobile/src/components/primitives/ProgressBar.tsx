import { Animated, View, type StyleProp, type ViewStyle } from "react-native";
import { useEffect, useMemo, useRef } from "react";

import { useReducedMotionPreference } from "../../lib/motion/reduced-motion";
import { createTiming } from "../../lib/motion/transitions";
import { colors, createShadowStyle, radii } from "../../theme";

export interface ProgressBarProps {
  progress: number;
  style?: StyleProp<ViewStyle>;
  height?: number;
  tone?: "accent" | "positive";
  emphasizeCompletion?: boolean;
}

export const ProgressBar = ({ progress, style, height = 10, tone = "accent", emphasizeCompletion = false }: ProgressBarProps) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const progressValue = useRef(new Animated.Value(clampedProgress)).current;
  const completionScale = useRef(new Animated.Value(1)).current;
  const { isReducedMotion } = useReducedMotionPreference();

  useEffect(() => {
    if (isReducedMotion) {
      progressValue.setValue(clampedProgress);
      return;
    }

    createTiming({
      value: progressValue,
      toValue: clampedProgress,
      duration: 420,
      intensity: "structural",
      useNativeDriver: false,
    }).start();
  }, [clampedProgress, isReducedMotion, progressValue]);

  useEffect(() => {
    if (isReducedMotion || !emphasizeCompletion || clampedProgress < 1) {
      completionScale.setValue(1);
      return;
    }

    completionScale.setValue(0.992);
    Animated.sequence([
      createTiming({
        value: completionScale,
        toValue: 1.018,
        duration: 180,
        intensity: "emphasis",
      }),
      createTiming({
        value: completionScale,
        toValue: 1,
        duration: 220,
        intensity: "structural",
      }),
    ]).start();
  }, [clampedProgress, completionScale, emphasizeCompletion, isReducedMotion]);

  const fillWidth = useMemo(
    () =>
      progressValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
      }),
    [progressValue],
  );
  const fillColor = tone === "positive" ? colors.positive : colors.accentStrong;
  const glowColor = tone === "positive" ? colors.positive : colors.accentStrong;

  return (
    <Animated.View
      style={[
        {
          height,
          width: "100%",
          borderRadius: radii.pill,
          borderWidth: 1,
          borderColor: colors.borderStrong,
          backgroundColor: colors.surfaceMuted,
          overflow: "hidden",
          padding: 2,
          transform: [{ scale: completionScale }],
        },
        style,
      ]}
    >
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 1,
          left: 1,
          right: 1,
          height: "44%",
          borderRadius: radii.pill,
          backgroundColor: colors.white,
          opacity: 0.64,
        }}
      />
      <Animated.View
        style={{
          width: fillWidth,
          height: "100%",
          borderRadius: radii.pill,
          backgroundColor: fillColor,
          ...createShadowStyle({
            color: glowColor,
            opacity: 0.42,
            radius: 20,
            offsetY: 8,
            elevation: 2,
          }),
          elevation: 2,
        }}
      >
        <View
          style={{
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "42%",
            borderRadius: radii.pill,
            backgroundColor: colors.white,
            opacity: 0.3,
          }}
        />
      </Animated.View>
    </Animated.View>
  );
};
