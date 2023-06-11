import { useState } from "react";
import { useDispatch } from "react-redux";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { BsPencilFill, BsX, BsCheck2 } from "react-icons/bs";

import { AppDispatch, setChat, useUpdateGroupChatMutation } from "../../store";

import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";

import { getChatAvatar } from "../../utils";

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
}

const ChatGroupModalAvatar = ({ user, chat }: ChatGroupModalAvatarProps) => {
  const dispatch: AppDispatch = useDispatch();

  const [updateGroupChat] = useUpdateGroupChatMutation();

  const [showEditAvatar, setShowEditAvatar] = useState<boolean>(false);

  const {
    register: registerAvatar,
    handleSubmit: handleSubmitAvatar,
    formState: { errors: errorsAvatar, isSubmitting: isSubmittingAvatar },
  } = useForm<ChatGroupAvatarValidationSchema>({
    resolver: zodResolver(chatGroupAvatarValidationSchema),
    mode: "onBlur",
  });

  const onSubmitAvatarHandler: SubmitHandler<ChatGroupAvatarValidationSchema> = async (data) => {
    const { avatar } = data;
    const request = { chatId: chat._id, avatar };
    const { chat: updatedGroupChat } = await updateGroupChat(request).unwrap();
    setShowEditAvatar(false);
    dispatch(setChat(updatedGroupChat));
  };

  return (
    <div>
      <div className="h-24 flex items-center justify-center">
        <img src={getChatAvatar(user, chat)} alt="Chat Avatar" className="w-24 h-24 rounded-full" />
        {user._id === chat.groupAdmin?._id ? (
          <button onClick={() => setShowEditAvatar(true)} disabled={showEditAvatar}>
            <BsPencilFill style={{ color: showEditAvatar ? "#f3f4f6" : "#9ca3af" }} />
          </button>
        ) : (
          ""
        )}
      </div>
      <form
        className="p-2 h-12 flex items-center justify-center"
        onSubmit={handleSubmitAvatar(onSubmitAvatarHandler)}
      >
        {showEditAvatar && (
          <div className="relative flex items-center justify-center w-3/4">
            <input
              id="Group Chat Avatar"
              autoComplete="off"
              className={`px-1 py-0.5 w-full rounded border-2 bg-gray-200 focus:bg-gray-50 focus:outline-none focus:shadow-outline focus:border-indigo-400 transition-colors ${
                errorsAvatar.avatar && "border-red-500"
              }`}
              value={chat.avatar}
              placeholder="Enter group name"
              type="text"
              {...registerAvatar("avatar")}
            ></input>
            <span className="absolute -right-11 flex items-center justify-center">
              {" "}
              <button
                onClick={() => {
                  setShowEditAvatar(false);
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
