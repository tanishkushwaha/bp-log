import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "@/theme/ThemeContext";
import { colors } from "@/theme/colors";
import PickerField from "@/components/PickerField";
import TextField from "@/components/TextField";

export default function Add() {
  const { theme } = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors[theme].primary,
          flex: 1,
        },
        bp: {
          flexDirection: "row",
          gap: 18,
          marginTop: 12,
        },
        dateTime: {
          flexDirection: "row",
          gap: 12,
          marginTop: 12,
        },
        form: {
          paddingHorizontal: 12,
        },
      }),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <DateTimePanel />
        <BPPanel />
      </View>
    </View>
  );
}

function DateTimePanel() {
  const { theme } = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: "row",
          gap: 12,
          marginTop: 12,
        },
      }),
    []
  );
  return (
    <View style={styles.container}>
      <PickerField title='Date' style={{ flex: 2 }} />
      <PickerField title='Time' style={{ flex: 1 }} />
    </View>
  );
}

function BPPanel() {
  const { theme } = useTheme();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: "row",
          gap: 12,
          marginTop: 12,
        },
        unitText: {
          color: colors[theme].text,
          position: "absolute",
          bottom: -18,
          left: 12,
          fontSize: 12,
        },
        separator: {
          color: colors[theme].text,
          position: "absolute",
          right: -9,
          top: 18,
        },
      }),
    []
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, position: "relative" }}>
        <TextField placeholder='Sys' />
        <Text style={styles.unitText}>mmHg</Text>
        <Text style={styles.separator}>/</Text>
      </View>
      <View style={{ flex: 1, position: "relative" }}>
        <TextField placeholder='Dia' style={{ flex: 1 }} />
        <Text style={styles.unitText}>mmHg</Text>
      </View>
      <View style={{ flex: 1, position: "relative" }}>
        <TextField placeholder='Pulse' style={{ flex: 1 }} />
        <Text style={styles.unitText}>BPM</Text>
      </View>
    </View>
  );
}
