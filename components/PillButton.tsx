import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function PillButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
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
      <View style={styles.container}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </Pressable>
  );
}
