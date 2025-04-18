import PillButton from "@/components/PillButton";
import ThreeDotMenu from "@/components/ThreeDotMenu";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/ThemeContext";
import { router, Stack } from "expo-router";
import { FormDataProvider, useFormData } from "@/contexts/FormDataContext";
import { BPDataType, useBPData } from "@/contexts/BPDataContext";
import uuid from "react-native-uuid";
import { useMemo } from "react";
import { combineDateAndTime } from "@/utils/functions";

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
          options={{
            title: "Edit Reading",
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

  const isValidForm = useMemo((): boolean => {
    if (!formData.sys || !formData.dia || !formData.pulse) return false;
    return true;
  }, [formData]);

  const handlePress = () => {
    if (formData && isValidForm) {
      const data: BPDataType = {
        id: uuid.v4(),

        date: combineDateAndTime(formData.date, formData.time),
        bp_sys: Number(formData.sys),
        bp_dia: Number(formData.dia),
        pr: Number(formData.pulse),
      };
      updateData(data);
      router.back();
      return;
    }
  };

  return (
    <PillButton title='Save' onPress={handlePress} disabled={!isValidForm} />
  );
}
