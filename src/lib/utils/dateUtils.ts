import { format, add } from "date-fns";

export const getTodayAndTomorrow = () => {
  const today = new Date();
  const tomorrow = add(today, { days: 1 });
  const formatDate = (date: any) => format(date, "dd MMM");

  return {
    today: formatDate(today),
    tommorow: formatDate(tomorrow),
  };
};
