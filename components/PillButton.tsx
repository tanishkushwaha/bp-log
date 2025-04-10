import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";

export default function PillButton({ title }: { title: string }) {
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
        },
        buttonText: {
          color: colors[theme].text,
        },
      }),
    []
  );

  return (
    <View>
      <TouchableNativeFeedback>
        <View style={styles.container}>
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}
