import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { colors } from "@/theme/colors";
import { useMemo } from "react";

type propsType = {
  placeholder: string;
  style?: StyleProp<ViewStyle>;
};

export default function TextField({ placeholder, style }: propsType) {
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
    []
  );

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={colors[theme].text}
      />
    </View>
  );
}
