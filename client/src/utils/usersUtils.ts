import { User } from "../types/userTypes";
import { Chat } from "../types/chatTypes";

const getOtherUser = (user: User, chat: Chat) => {
  if (chat.participants.length === 1) return chat.participants[0];
  return user._id === chat.participants[0]._id ? chat.participants[1] : chat.participants[0];
};

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
  return user && getOtherUserName(user, chat);
};

const getChatAvatar = (user: User, chat: Chat) => {
  if (chat.isGroupChat) return chat.avatar;
  return user && getOtherUserAvatar(user, chat);
};

const getChatIsTyping = (typingText: string, chat: Chat) => {
  return `${chat.isGroupChat ? typingText + " " : ""}is typing...`;
};

export { getOtherUser, getOtherUserId, getChatName, getChatAvatar, getChatIsTyping };
