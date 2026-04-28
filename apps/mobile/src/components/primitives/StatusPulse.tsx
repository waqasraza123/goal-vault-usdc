import type { PropsWithChildren } from "react";
import { Animated, type StyleProp, type ViewStyle } from "react-native";
import { useEffect, useMemo, useRef } from "react";

import { useReducedMotionPreference } from "../../lib/motion/reduced-motion";
import { createTiming } from "../../lib/motion/transitions";
import { motion } from "../../theme";

export interface StatusPulseProps {
  active?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const StatusPulse = ({ active = true, children, style }: PropsWithChildren<StatusPulseProps>) => {
  const pulse = useRef(new Animated.Value(0)).current;
  const { isReducedMotion } = useReducedMotionPreference();

  useEffect(() => {
    if (!active || isReducedMotion) {
      pulse.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        createTiming({
          value: pulse,
          toValue: 1,
          duration: motion.duration.slow,
          intensity: "subtle",
        }),
        createTiming({
          value: pulse,
          toValue: 0,
          duration: motion.duration.slow,
          intensity: "subtle",
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [active, isReducedMotion, pulse]);

  const animatedStyle = useMemo(
    () => ({
      opacity: pulse.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.74],
      }),
      transform: [
        {
          scale: pulse.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.035],
          }),
        },
      ],
    }),
    [pulse],
  );

  return <Animated.View style={[active && !isReducedMotion ? animatedStyle : null, style]}>{children}</Animated.View>;
};
