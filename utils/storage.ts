import { BPDataType } from "@/contexts/BPDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "BPData";

export const storeAllBPData = async (value: BPDataType[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getAllBPData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (!jsonValue) return [];

    const parsed: BPDataType[] = JSON.parse(jsonValue, (key, value) => {
      if (key === "date" || key === "time") return new Date(value);
      return value;
    });

    return parsed;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const updateBPData = async (id: string, data: BPDataType) => {
  const existingData = await getAllBPData();

  const updatedData: BPDataType[] = existingData.map((item) =>
    item.id === id ? data : item
  );

  await storeAllBPData(updatedData);
};

export const storeBPData = async (data: BPDataType) => {
  const existingData = await getAllBPData();

  await storeAllBPData([...existingData, data]);
};

export const deleteBPData = async (id: string) => {
  const existingData = await getAllBPData();
  const updatedData = existingData.filter((item) => item.id != id);

  await storeAllBPData(updatedData);
};
