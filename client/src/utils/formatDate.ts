import dayjs from "dayjs";

const getShortFormatDate = (date: Date) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export { getShortFormatDate };
