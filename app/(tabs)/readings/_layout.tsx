import PillButton from "@/components/PillButton";
import ThreeDotMenu from "@/components/ThreeDotMenu";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { router, Stack } from "expo-router";
import { FormDataProvider, useFormData } from "@/contexts/FormDataContext";
import { BPDataType, useBPData } from "@/contexts/BPDataContext";
import uuid from "react-native-uuid";
import { useMemo } from "react";

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
      </Stack>
    </FormDataProvider>
  );
}

function SaveButton() {
  const { formData } = useFormData();
  const { updateData } = useBPData();
  const { theme } = useTheme();

  const isValidForm = useMemo((): boolean => {
    if (!formData.sys || !formData.dia || !formData.pulse) return false;
    return true;
  }, [formData]);

  const handlePress = () => {
    if (formData && isValidForm) {
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
      router.back();
      return;
    }
    console.log("Form data is missing!");
  };

  return (
    // TODO: Add disabled state to the button
    <PillButton
      title='Save'
      onPress={handlePress}
      backgroundColor={isValidForm ? colors[theme].accent : colors[theme].focus}
      textColor={isValidForm ? colors[theme].primary : colors[theme].text}
    />
  );
}
