import PillButton from "@/components/PillButton";
import ThreeDotMenu from "@/components/ThreeDotMenu";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { router, Stack } from "expo-router";
import { FormDataProvider, useFormData } from "@/contexts/FormDataContext";
import { BPDataType, useBPData } from "@/contexts/BPDataContext";
import uuid from "react-native-uuid";

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
            headerRight: () => {
              // TODO: Extract it into a separate component
              const { formData } = useFormData();
              const { updateData } = useBPData();

              const handlePress = () => {
                if (formData) {
                  const data: BPDataType = {
                    id: uuid.v4(),
                    day: formData.date.toLocaleDateString("en-GB", {
                      weekday: "short",
                    }),
                    date: formData.date.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    }),
                    time: formData.time.toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }),
                    bp_sys: Number(formData.sys),
                    bp_dia: Number(formData.dia),
                    pr: Number(formData.pulse),
                  };
                  updateData(data);
                  console.log("BPData Updated!");
                  return;
                }
                console.log("Form data is missing!");

                // TODO: Investigate why router.push() is not working when the button is pressed and fix it
                router.push("/readings");
              };

              return <PillButton title='Save' onPress={handlePress} />;
            },
          }}
        />
      </Stack>
    </FormDataProvider>
  );
}
