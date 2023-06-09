import dayjs from "dayjs";

const getShortFormatDate = (dateArg: Date) => {
  const date = dayjs(dateArg);
  const today = dayjs();

  const diffDays = today.diff(date, "day");

  if (today.isSame(date, "day")) {
    return "Today";
  } else if (0 <= diffDays && diffDays <= 1) {
    return `Yesterday`;
  } else if (1 < diffDays && diffDays <= 6) {
    return `${diffDays} days ago`;
  } else if (diffDays === 7) {
    return "A week ago";
  } else {
    return date.format("DD/MM/YYYY");
  }
};

const getMessageDate = (dateArg: Date) => {
  const date = dayjs(dateArg);
  const today = dayjs();

  return today.isSame(date, "day") ? date.format("HH:mm") : getShortFormatDate(dateArg);
};

const getMessageHour = (date: Date) => dayjs(date).format("HH:mm");

export { getShortFormatDate, getMessageDate, getMessageHour };
