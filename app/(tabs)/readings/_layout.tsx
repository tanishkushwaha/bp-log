import ThreeDotMenu from "@/components/ThreeDotMenu";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { Stack } from "expo-router";
import { FormDataProvider } from "@/contexts/FormDataContext";
import SaveButton from "@/components/SaveButton";

export default function Readingslayout() {
  const { theme } = useTheme();

  return (
    <FormDataProvider>
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
            headerRight: () => <SaveButton />,
          }}
        />

        <Stack.Screen
          name='[id]'
          options={({ route }) => {
            const { id } = route.params as { id: string };

            return {
              title: "Edit Reading",
              headerRight: () => <SaveButton itemId={id} />,
            };
          }}
        />
      </Stack>
    </FormDataProvider>
  );
}
