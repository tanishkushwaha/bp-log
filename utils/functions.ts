import { BPDataType } from "@/contexts/BPDataContext";
import uuid from "react-native-uuid";

export const combineDateAndTime = (dateObj: Date, timeObj: Date): Date => {
  const res = new Date(dateObj);
  res.setTime(timeObj.getTime());

  return res;
};

export const generateMockBPData = (days: number = 60): BPDataType[] => {
  const data: BPDataType[] = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const entry: BPDataType = {
      id: uuid.v4(),
      date,
      bp_sys: Math.floor(Math.random() * 40) + 100, // 100 - 139
      bp_dia: Math.floor(Math.random() * 20) + 60, // 60 - 79
      pr: Math.floor(Math.random() * 40) + 60, // 60 - 99
    };

    data.push(entry);
  }

  return data;
};
