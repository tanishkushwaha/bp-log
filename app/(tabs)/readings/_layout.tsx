import PillButton from "@/components/PillButton";
import ThreeDotMenu from "@/components/ThreeDotMenu";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { Stack } from "expo-router";

export default function Readingslayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors[theme].primary,
        },
        headerTitleStyle: {
          color: colors[theme].text,
        },
        headerTintColor: colors[theme].text,
      }}
    >
      <Stack.Screen
        name='index'
        options={{ title: "Readings", headerRight: () => <ThreeDotMenu /> }}
      />
      <Stack.Screen
        name='add'
        options={{
          title: "Add Reading",
          headerRight: () => <PillButton title='Save' />,
        }}
      />
    </Stack>
  );
}
