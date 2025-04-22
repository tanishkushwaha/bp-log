import React, { useMemo, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@/theme/ThemeContext";
import { colors } from "@/theme/colors";
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import { router } from "expo-router";

export default function ThreeDotMenu() {
  const { theme } = useTheme();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors[theme].primary,
          padding: 4,
          zIndex: 99,
          borderRadius: "64",
        },
        menu: {
          position: "absolute",
          top: 48,
          right: 12,
          minWidth: 128,
          backgroundColor: colors[theme].secondary,
          borderRadius: 8,
        },
        menuItem: {
          padding: 12,
        },
        menuItemText: {
          color: colors[theme].text,
        },
        overlay: {
          flex: 1,
        },
      }),
    [theme]
  );

  return (
    <>
      {/* 3 Dots Button */}
      <Pressable
        onPressOut={() => {
          setMenuVisible(true);
        }}
        style={({ pressed }) => [
          { overflow: "hidden", borderRadius: 64 },
          pressed && { opacity: 0.8 },
        ]}
      >
        <View style={styles.container}>
          <MaterialCommunityIcons
            name='dots-vertical'
            size={24}
            color={colors[theme].text}
          />
        </View>
      </Pressable>
      {/* Modal for dropdown menu (Transparent) */}
      <Modal
        animationType='fade'
        visible={menuVisible}
        transparent={true}
        onRequestClose={() => setMenuVisible(false)}
      >
        {/* Transparent overlay for capturing tap aways */}
        <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menu}>
            <View style={styles.menuItem}>
              <TouchableNativeFeedback
                onPress={() => router.push("/(root)/settings")}
              >
                <Text style={styles.menuItemText}>Settings</Text>
              </TouchableNativeFeedback>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
