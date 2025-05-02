export const readingsFormatter = (readings: any) => {
  return readings
    .map((r: any) => {
      const date = new Date(r.date).toLocaleDateString();
      return `Date: ${date} | Systolic: ${r.bp_sys} | Diastolic: ${r.bp_dia} | Pulse: ${r.pr}`;
    })
    .join('\n');
};
