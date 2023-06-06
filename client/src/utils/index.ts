import dayjs from "dayjs";
import { User } from "../types/userTypes";
import { Chat } from "../types/chatTypes";

const getShortFormatDate = (dateString: Date) => {
  const date = dayjs(dateString);
  const today = dayjs();

  const diffDays = today.diff(date, "day");

  console.log("diffDays: " + diffDays);

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

const getMessageHour = (date: Date) => dayjs(date).format("HH:mm");

const getOtherUserAttribute = (user: User, chat: Chat, attr: "_id" | "userName" | "avatar") => {
  if (chat.participants.length === 1) return chat.participants[0][attr];
  return user._id === chat.participants[0]._id
    ? chat.participants[1][attr]
    : chat.participants[0][attr];
};

const getOtherUserId = (user: User, chat: Chat) => getOtherUserAttribute(user, chat, "_id");

const getOtherUserName = (user: User, chat: Chat) => getOtherUserAttribute(user, chat, "userName");

const getOtherUserAvatar = (user: User, chat: Chat) => getOtherUserAttribute(user, chat, "avatar");

const getChatName = (user: User, chat: Chat) => {
  if (chat.isGroupChat) return chat.chatName;
  return getOtherUserName(user, chat);
};

const getChatAvatar = (user: User, chat: Chat) => {
  if (chat.isGroupChat) return chat.avatar;
  return getOtherUserAvatar(user, chat);
};

export { getShortFormatDate, getMessageHour, getOtherUserId, getChatName, getChatAvatar };
