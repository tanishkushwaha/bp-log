import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import React, { useMemo, useState } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function ComboBox({
  value,
  setValue,
  items,
  setItems,
}: {
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  items: any;
  setItems: any;
}) {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        combo: {
          backgroundColor: colors[theme].primary,
          borderColor: colors[theme].text,
          width: 150,
          marginHorizontal: 18,
        },
        comboText: {
          color: colors[theme].text,
        },
        comboListItemContainerStyle: {
          backgroundColor: colors[theme].secondary,
        },
        comboArrowIconStyle: {
          tintColor: colors[theme].text,
        },
        combodropDownContainerStyle: {
          width: 256,
          marginHorizontal: 16,
          borderWidth: 0,
          borderRadius: 0,
        },
      }),
    []
  );

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={styles.combo}
      textStyle={styles.comboText}
      listItemContainerStyle={styles.comboListItemContainerStyle}
      arrowIconStyle={styles.comboArrowIconStyle as ViewStyle}
      dropDownContainerStyle={styles.combodropDownContainerStyle}
    />
  );
}
