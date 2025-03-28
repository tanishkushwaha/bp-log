import colors from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { Text, View } from "react-native";

export default function Index() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors[theme].primary,
      }}
    ></View>
  );
}
