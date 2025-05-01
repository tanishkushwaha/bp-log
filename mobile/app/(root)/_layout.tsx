import { colors } from "@/theme/colors";
import { useTheme, ThemeProvider } from "@/theme/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayoutWrapper() {
  return (
    <ThemeProvider>
      <RootLayout />
    </ThemeProvider>
  );
}

function RootLayout() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar
        backgroundColor={colors[theme].primary}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
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
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='settings' options={{ title: "Settings" }} />
      </Stack>
    </>
  );
}
