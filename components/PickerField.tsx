import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { colors } from "@/theme/colors";
import { useMemo } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

type propsType = {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function PickerField({ title, onPress, style }: propsType) {
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
        icon: {
          position: "absolute",
          right: 12,
          top: 20,
        },
        title: {
          color: colors[theme].text,
        },
      }),
    []
  );

  const handlePress = () => {
    console.log("Pressed!");
  };

  return (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={[styles.container, style]}>
        <>
          <Text style={styles.title}>{title}</Text>
          <AntDesign
            style={styles.icon}
            name='caretdown'
            size={12}
            color={colors[theme].text}
          />
        </>
      </View>
    </TouchableNativeFeedback>
  );
}
