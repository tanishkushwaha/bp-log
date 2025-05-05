import type { BPDataType } from '../types.js';

export const readingsFormatter = (readings: BPDataType[]) => {
  return readings
    .map((reading: BPDataType) => {
      const date = new Date(reading.date).toLocaleDateString();
      return `Date: ${date} | Systolic: ${reading.bp_sys} | Diastolic: ${reading.bp_dia} | Pulse: ${reading.pr}`;
    })
    .join('\n');
};
