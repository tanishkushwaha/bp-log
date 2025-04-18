import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function PillButton({
  title,
  onPress,
  disabled,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: disabled
            ? colors[theme].focus
            : colors[theme].accent,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 12,
          height: 32,
          minWidth: 64,
          borderRadius: 16,
          overflow: "hidden",
        },
        buttonText: {
          color: disabled ? "gray" : colors[theme].primary,
        },
      }),
    [disabled]
  );

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
      onPressOut={onPress}
      disabled={disabled}
    >
      <View style={styles.container}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </Pressable>
  );
}
