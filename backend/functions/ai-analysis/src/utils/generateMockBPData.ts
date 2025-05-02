import { v4 as uuidv4 } from 'uuid';

export const generateMockBPData = (days = 60) => {
  const data = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const entry = {
      id: uuidv4(),
      date,
      bp_sys: Math.floor(Math.random() * 40) + 100, // 100 - 139
      bp_dia: Math.floor(Math.random() * 20) + 60, // 60 - 79
      pr: Math.floor(Math.random() * 40) + 60, // 60 - 99
    };

    data.push(entry);
  }

  return data;
};