import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  InputModeOptions,
} from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { colors } from "@/theme/colors";
import { useMemo } from "react";

type propsType = {
  placeholder: string;
  value: string;
  onChangeText: (val: string) => void;
  style?: StyleProp<ViewStyle>;
  inputMode?: InputModeOptions | undefined;
};

export default function TextField({
  placeholder,
  style,
  value,
  onChangeText,
  inputMode,
}: propsType) {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors[theme].primary,
          borderWidth: 1,
          borderColor: colors[theme].text,
          borderRadius: 4,
          height: 56,
          position: "relative",
          justifyContent: "center",
          paddingLeft: 12,
        },
        textInput: {
          color: colors[theme].text,
        },
      }),
    [theme]
  );

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={colors[theme].text}
        value={value}
        onChangeText={onChangeText}
        inputMode={inputMode}
      />
    </View>
  );
}
