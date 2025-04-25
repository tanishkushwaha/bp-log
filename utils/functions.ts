import { BPDataType } from "@/contexts/BPDataContext";
import { IndicatorColor, colors } from "@/theme/colors";
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

export const getBpIndicatorColor = (
  sys: number,
  dia: number
): IndicatorColor => {
  if (sys < 120 && dia <= 80) {
    return colors.indicator.green; // Normal
  } else if (sys < 130 && dia < 80) {
    return colors.indicator.yellow; // Elevated
  } else if (sys < 140 && dia < 90) {
    return colors.indicator.orange; // Hypertension Stage 1
  } else if (sys < 180 && dia <= 120) {
    return colors.indicator.deepOrange; // Hypertension Stage 2
  } else {
    return colors.indicator.red; // Hypertensive Crisis
  }
};
