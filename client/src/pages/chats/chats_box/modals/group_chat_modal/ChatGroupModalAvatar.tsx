import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { BsPencilFill, BsX, BsCheck2 } from "react-icons/bs";

import { AppDispatch, setChat, useUpdateGroupChatMutation } from "../../../../../store";

import { User } from "../../../../../types/userTypes";
import { Chat } from "../../../../../types/chatTypes";

import { getChatAvatar } from "../../../../../utils";

const chatGroupAvatarValidationSchema = z.object({
  avatar: z
    .string()
    .min(1, { message: "Link to an image is required" })
    .url({ message: "Please enter a link to an image" }),
});

type ChatGroupAvatarValidationSchema = z.infer<typeof chatGroupAvatarValidationSchema>;

interface ChatGroupModalAvatarProps {
  user: User;
  chat: Chat;
  socket: Socket | null;
  socketConnected: boolean;
}

const ChatGroupModalAvatar = ({
  user,
  chat,
  socket,
  socketConnected,
}: ChatGroupModalAvatarProps) => {
  const dispatch: AppDispatch = useDispatch();

  const [updateGroupChat] = useUpdateGroupChatMutation();

  const [showEditAvatar, setShowEditAvatar] = useState<boolean>(false);

  const {
    register: registerAvatar,
    handleSubmit: handleSubmitAvatar,
    formState: { errors: errorsAvatar, isSubmitting: isSubmittingAvatar },
    reset: resetAvatar,
  } = useForm<ChatGroupAvatarValidationSchema>({
    resolver: zodResolver(chatGroupAvatarValidationSchema),
    defaultValues: {
      avatar: chat.avatar || "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    resetAvatar({ avatar: chat.avatar || "" });
  }, [resetAvatar, chat.avatar]);

  const onSubmitAvatarHandler: SubmitHandler<ChatGroupAvatarValidationSchema> = async (data) => {
    if (!socketConnected || !socket) return;

    const { avatar } = data;
    const request = { chatId: chat._id, avatar };
    const { chat: updatedGroupChat } = await updateGroupChat(request).unwrap();
    socket.emit("updated group chat", updatedGroupChat);
    setShowEditAvatar(false);
    dispatch(setChat(updatedGroupChat));
  };

  return (
    <div>
      <div className="h-36 flex items-center justify-center">
        <div className="relative">
          <img
            src={getChatAvatar(user, chat)}
            alt="Chat Avatar"
            className="w-32 h-32 rounded-full"
          />
          <button
            className="absolute -right-5 bottom-1/2 translate-y-1/2"
            onClick={() => setShowEditAvatar(true)}
            disabled={(chat.groupAdmin && chat.groupAdmin._id !== user._id) || showEditAvatar}
          >
            <BsPencilFill
              style={{
                color:
                  (chat.groupAdmin && chat.groupAdmin._id !== user._id) || showEditAvatar
                    ? "#f3f4f6"
                    : "#9ca3af",
                height: "1rem",
                width: "1rem",
              }}
            />
          </button>
        </div>
      </div>
      <form
        className="mt-2 h-8 flex items-center justify-center"
        onSubmit={handleSubmitAvatar(onSubmitAvatarHandler)}
      >
        {showEditAvatar && (
          <div className="relative flex flex-col items-center justify-center w-3/4">
            <input
              id="Group Chat Avatar"
              autoComplete="off"
              className={`px-1 py-0.5 w-full rounded border-2 bg-gray-200 focus:bg-gray-50 focus:outline-none focus:shadow-outline focus:border-indigo-400 transition-colors ${
                errorsAvatar.avatar && "border-red-500"
              }`}
              placeholder="Enter group avatar"
              type="text"
              {...registerAvatar("avatar")}
            ></input>
            <span
              className={`text-xs ${errorsAvatar.avatar ? "text-red-500" : "text-transparent"}`}
            >
              {errorsAvatar.avatar ? errorsAvatar.avatar.message : "padding"}
            </span>
            <span className="absolute -right-10 bottom-5 flex items-center justify-center">
              <button
                onClick={() => {
                  setShowEditAvatar(false);
                  resetAvatar({ avatar: chat.avatar || "" });
                }}
              >
                <BsX style={{ color: "#9ca3af", height: "1.2rem", width: "1.2rem" }} />
              </button>
              <button type="submit" disabled={isSubmittingAvatar}>
                <BsCheck2 style={{ color: "#9ca3af", height: "1.2rem", width: "1.2rem" }} />
              </button>
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChatGroupModalAvatar;
