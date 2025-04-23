import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import React, { useMemo } from "react";
import { useTheme } from "@/theme/ThemeContext";
import { colors } from "@/theme/colors";

export default function ConfirmationModal({
  visible,
  onRequestClose,
  onConfirm,
}: {
  visible: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
}) {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        centeredView: {
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        container: {
          height: 132,
          width: 256,
          backgroundColor: colors[theme].secondary,
        },
        buttonGroup: {
          flexDirection: "row",
          justifyContent: "flex-end",
          height: 42,
        },
        labelContainer: {
          flex: 1,
          padding: 16,
        },
        label: {
          fontSize: 16,
          color: colors[theme].text,
        },
        buttonCancel: {
          justifyContent: "center",
          paddingHorizontal: 16,
        },
        buttonCancelText: {
          color: colors[theme].text,
        },
        buttonConfirm: {
          justifyContent: "center",
          paddingHorizontal: 16,
        },
        buttonConfirmText: {
          color: colors[theme].text,
        },
      }),
    []
  );

  return (
    <Modal transparent visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.container}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>
              Are you sure you want to delete this reading?
            </Text>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableNativeFeedback onPress={onRequestClose}>
              <View style={styles.buttonCancel}>
                <Text style={styles.buttonCancelText}>Cancel</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={onConfirm}>
              <View style={styles.buttonConfirm}>
                <Text style={styles.buttonConfirmText}>Confirm</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
}
