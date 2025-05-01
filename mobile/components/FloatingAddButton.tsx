import { View, Text, TouchableNativeFeedback, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { colors } from "@/theme/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useTheme } from "@/theme/ThemeContext";

export default function FloatingAddButton() {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: colors[theme].focus,
          position: "absolute",
          bottom: 16,
          right: 16,
          justifyContent: "center",
          alignItems: "center",
          elevation: 4,
        },
      }),
    []
  );

  return (
    <TouchableNativeFeedback onPress={() => router.push("/readings/add")}>
      <View style={styles.container}>
        <MaterialIcons name='add' size={32} color={colors[theme].text} />
      </View>
    </TouchableNativeFeedback>
  );
}
