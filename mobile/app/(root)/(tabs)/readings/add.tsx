import { View, StyleSheet } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { colors } from "@/theme/colors";
import ReadingForm from "@/components/ReadingForm";
import { useMemo } from "react";

export default function AddReadingScreen() {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors[theme].primary,
          flex: 1,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <ReadingForm />
    </View>
  );
}
