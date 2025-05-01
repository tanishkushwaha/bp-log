export const readingsFormatter = (readings) => {
  return readings.map(r => {
    const date = new Date(r.date).toLocaleDateString();
    return `Date: ${date} | Systolic: ${r.bp_sys} | Diastolic: ${r.bp_dia} | Pulse: ${r.pr}`;
  }).join('\n');
}