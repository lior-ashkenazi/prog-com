import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { BsPencilFill, BsX, BsCheck2 } from "react-icons/bs";

import { AppDispatch, setChat, useUpdateGroupChatMutation } from "../../store";

import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";

import { getChatName } from "../../utils";

const chatGroupNameValidationSchema = z.object({
  chatName: z.string().min(1, { message: "Group name is required" }),
});

type ChatGroupNameValidationSchema = z.infer<typeof chatGroupNameValidationSchema>;

interface ChatGroupModalNameProps {
  user: User;
  chat: Chat;
}

const ChatGroupModalName = ({ user, chat }: ChatGroupModalNameProps) => {
  const dispatch: AppDispatch = useDispatch();

  const [updateGroupChat] = useUpdateGroupChatMutation();

  const [showEditName, setShowEditName] = useState<boolean>(false);

  const {
    register: registerName,
    handleSubmit: handleSubmitName,
    formState: { errors: errorsName, isSubmitting: isSubmittingName },
    reset: resetName,
  } = useForm<ChatGroupNameValidationSchema>({
    resolver: zodResolver(chatGroupNameValidationSchema),
    defaultValues: {
      chatName: getChatName(user, chat) || "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    resetName({ chatName: getChatName(user, chat) || "" });
  }, [resetName, user, chat]);

  const onSubmitNameHandler: SubmitHandler<ChatGroupNameValidationSchema> = async (data) => {
    const { chatName } = data;
    const request = { chatId: chat._id, chatName };
    const { chat: updatedGroupChat } = await updateGroupChat(request).unwrap();
    setShowEditName(false);
    dispatch(setChat(updatedGroupChat));
  };

  return (
    <div className="h-16 flex items-center justify-center">
      {!showEditName ? (
        <div>
          <span className="relative font-medium text-3xl truncate">
            {chat.chatName}
            <button
              className="absolute -right-8 bottom-1/2 translate-y-1/2"
              onClick={() => setShowEditName(true)}
              disabled={(chat.groupAdmin && chat.groupAdmin._id !== user._id) || showEditName}
            >
              <BsPencilFill
                style={{
                  color:
                    (chat.groupAdmin && chat.groupAdmin._id !== user._id) || showEditName
                      ? "#f3f4f6"
                      : "#9ca3af",
                  height: "1rem",
                  width: "1rem",
                }}
              />
            </button>
          </span>
        </div>
      ) : (
        <form
          className="bg-green 500 flex items-center justify-center"
          onSubmit={handleSubmitName(onSubmitNameHandler)}
        >
          {showEditName && (
            <div className="relative flex flex-col items-center justify-center w-11/12">
              <input
                id="Group Chat Avatar"
                autoComplete="off"
                className={`font-semibold text-3xl px-2 py-1 w-full rounded-sm bg-gray-100 focus:outline-none border-b-4 border-indigo-400 transition-colors ${
                  errorsName.chatName && "border-red-500"
                }`}
                placeholder="Enter group name"
                type="text"
                {...registerName("chatName")}
              ></input>
              <span
                className={`text-xs ${errorsName.chatName ? "text-red-500" : "text-transparent"}`}
              >
                {errorsName.chatName ? errorsName.chatName.message : "padding"}
              </span>
              <span className="absolute -right-11 flex items-center justify-center">
                <button
                  onClick={() => {
                    setShowEditName(false);
                    resetName({ chatName: getChatName(user, chat) || "" });
                  }}
                >
                  <BsX style={{ color: "#9ca3af", height: "1.2rem", width: "1.2rem" }} />
                </button>
                <button type="submit" disabled={isSubmittingName}>
                  <BsCheck2 style={{ color: "#9ca3af", height: "1.2rem", width: "1.2rem" }} />
                </button>
              </span>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default ChatGroupModalName;
