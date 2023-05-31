import dayjs from "dayjs";
import { User } from "../types/userTypes";
import { Chat } from "../types/chatTypes";

const getShortFormatDate = (date: Date) => {
  return dayjs(date).format("DD/MM/YYYY");
};

const getOtherUserAttribute = (user: User, chat: Chat, attr: "_id" | "userName") => {
  if (chat.participants.length === 1) return chat.participants[0][attr];
  return user._id === chat.participants[0]._id
    ? chat.participants[1][attr]
    : chat.participants[0][attr];
};

const getOtherUserId = (user: User, chat: Chat) => getOtherUserAttribute(user, chat, "_id");

const getOtherUserName = (user: User, chat: Chat) => getOtherUserAttribute(user, chat, "userName");

const getChatName = (user: User, chat: Chat) => {
  if (chat.isGroupChat) return chat.chatName;
  return getOtherUserName(user, chat);
};

export { getShortFormatDate, getOtherUserId, getChatName };
