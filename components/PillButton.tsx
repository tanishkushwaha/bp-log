import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";

export default function PillButton({
  title,
  onPress,
  backgroundColor,
  textColor,
}: {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
}) {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors[theme].focus,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 12,
          height: 32,
          minWidth: 64,
          borderRadius: 16,
          overflow: "hidden",
        },
        buttonText: {
          color: colors[theme].text,
        },
      }),
    []
  );

  // TODO: Fix the unregistering of button presses
  return (
    <Pressable
      android_ripple={{
        color: colors[theme].primary,
        borderless: true,
        foreground: true,
        radius: 128,
      }}
      style={{
        overflow: "hidden",
        borderRadius: 20,
      }}
      onPress={onPress}
    >
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
      </View>
    </Pressable>
  );
}
