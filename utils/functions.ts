export const combineDateAndTime = (dateObj: Date, timeObj: Date): Date => {
  const res = new Date(dateObj);
  res.setTime(timeObj.getTime());

  return res;
};
