import { useBPData, BPDataType } from "@/contexts/BPDataContext";
import { useFormData } from "@/contexts/FormDataContext";
import { combineDateAndTime } from "@/utils/functions";
import { router } from "expo-router";
import { useMemo } from "react";
import uuid from "react-native-uuid";
import PillButton from "./PillButton";

export default function SaveButton({ itemId }: { itemId?: string }) {
  const { formData } = useFormData();
  const { updateData, addData } = useBPData();

  const isValidForm = useMemo((): boolean => {
    if (!formData.sys || !formData.dia || !formData.pulse) return false;
    return true;
  }, [formData]);

  const handlePress = () => {
    if (formData && isValidForm) {
      if (!itemId) {
        const data: BPDataType = {
          id: uuid.v4(),

          date: combineDateAndTime(formData.date, formData.time),
          bp_sys: Number(formData.sys),
          bp_dia: Number(formData.dia),
          pr: Number(formData.pulse),
        };
        addData(data);
        router.back();
        return;
      }
      const data: BPDataType = {
        id: itemId,

        date: combineDateAndTime(formData.date, formData.time),
        bp_sys: Number(formData.sys),
        bp_dia: Number(formData.dia),
        pr: Number(formData.pulse),
      };
      updateData(itemId, data);
      router.back();
    }
  };

  return (
    <PillButton title='Save' onPress={handlePress} disabled={!isValidForm} />
  );
}
