import { Animated, Pressable, type GestureResponderEvent, type PressableProps, type StyleProp, type ViewStyle } from "react-native";

import { useInteractiveMotion } from "../../lib/motion/feedback-motion";
import type { MotionIntensity } from "../../lib/motion/presets";

export interface MotionPressableProps extends Omit<PressableProps, "children"> {
  children: PressableProps["children"];
  containerStyle?: StyleProp<ViewStyle>;
  intensity?: MotionIntensity;
}

export const MotionPressable = ({
  children,
  containerStyle,
  disabled,
  intensity = "subtle",
  onBlur,
  onFocus,
  onHoverIn,
  onHoverOut,
  onPressIn,
  onPressOut,
  ...props
}: MotionPressableProps) => {
  const motion = useInteractiveMotion(intensity);

  const handlePressIn = (event: GestureResponderEvent) => {
    motion.onPressIn();
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    motion.onPressOut();
    onPressOut?.(event);
  };

  return (
    <Animated.View style={[motion.animatedStyle, { opacity: disabled ? 0.74 : 1 }, containerStyle]}>
      <Pressable
        {...props}
        disabled={disabled}
        onBlur={(event) => {
          motion.onBlur();
          onBlur?.(event);
        }}
        onFocus={(event) => {
          motion.onFocus();
          onFocus?.(event);
        }}
        onHoverIn={(event) => {
          motion.onHoverIn();
          onHoverIn?.(event);
        }}
        onHoverOut={(event) => {
          motion.onHoverOut();
          onHoverOut?.(event);
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};
