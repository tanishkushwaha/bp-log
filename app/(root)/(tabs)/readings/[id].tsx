import { View, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import ReadingForm from "@/components/ReadingForm";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";

export default function EditReading() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors[theme].primary,
          flex: 1,
        },
      }),
    []
  );

  return (
    <View style={styles.container}>
      <ReadingForm itemId={id as string} />
    </View>
  );
}
