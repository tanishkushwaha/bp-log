import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Switch,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useTheme } from "@/theme/ThemeContext";
import { colors } from "@/theme/colors";
import HorizontalRule from "@/components/HorizontalRule";

export default function SettingsScreen() {
  const [themeModalVisible, setThemeModalVisible] = useState(false);

  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        screenContainer: {
          backgroundColor: colors[theme].primary,
          flex: 1,
        },
        modal: {
          height: 200,
          width: 250,
          backgroundColor: colors[theme].secondary,
          justifyContent: "flex-end",
        },
        centeredView: {
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        },
        buttonsGroup: {
          backgroundColor: "green",
          height: 56,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.screenContainer}>
      <DarkModeOption />
      <HorizontalRule />
      {/* //TODO: Add export to csv/pdf */}

      {/* Modals */}
      <Modal
        transparent={true}
        visible={themeModalVisible}
        animationType='slide'
        onRequestClose={() => setThemeModalVisible((prev) => !prev)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modal}>
            <View style={styles.buttonsGroup}></View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Option({
  title,
  subTitle,
  onPress,
}: {
  title: string;
  subTitle: string;
  onPress: () => void;
}) {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingHorizontal: 12,
          paddingVertical: 16,
        },
        title: {
          color: colors[theme].text,
          fontSize: 18,
        },
        subTitle: {
          color: "grey",
          fontSize: 14,
        },
      }),
    [theme]
  );

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </TouchableOpacity>
  );
}

function DarkModeOption() {
  const { theme, toggleTheme } = useTheme();

  const isSwitchEnabled = useMemo(
    () => (theme === "dark" ? true : false),
    [theme]
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingHorizontal: 12,
          paddingVertical: 16,
          flexDirection: "row",
          justifyContent: "space-between",
        },
        title: {
          color: colors[theme].text,
          fontSize: 18,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dark mode</Text>
      <Switch onChange={toggleTheme} value={isSwitchEnabled} />
    </View>
  );
}
