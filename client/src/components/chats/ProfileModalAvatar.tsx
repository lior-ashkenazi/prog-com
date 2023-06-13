import { useState, useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { BsPencilFill, BsX, BsCheck2 } from "react-icons/bs";

import { useUpdateProfileMutation } from "../../store";

import { User } from "../../types/userTypes";

const profileAvatarValidationSchema = z.object({
  avatar: z
    .string()
    .min(1, { message: "Link to an image is required" })
    .url({ message: "Please enter a link to an image" }),
});

type ProfileAvatarValidationSchema = z.infer<typeof profileAvatarValidationSchema>;

interface ProfileAvatarModalProps {
  user: User;
  profileUser: User;
}

const ProfileAvatarModal = ({ user, profileUser }: ProfileAvatarModalProps) => {
  const [updateProfile] = useUpdateProfileMutation();

  const [showEditAvatar, setShowEditAvatar] = useState<boolean>(false);

  const {
    register: registerAvatar,
    handleSubmit: handleSubmitAvatar,
    formState: { errors: errorsAvatar, isSubmitting: isSubmittingAvatar },
    reset: resetAvatar,
  } = useForm<ProfileAvatarValidationSchema>({
    resolver: zodResolver(profileAvatarValidationSchema),
    defaultValues: {
      avatar: profileUser.avatar || "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    resetAvatar({ avatar: profileUser.avatar || "" });
  }, [resetAvatar, profileUser.avatar]);

  const onSubmitAvatarHandler: SubmitHandler<ProfileAvatarValidationSchema> = async (data) => {
    const { avatar } = data;
    const request = { user: user._id, avatar };
    await updateProfile(request).unwrap();
    setShowEditAvatar(false);
  };

  return (
    <div>
      <div className="h-36 flex items-center justify-center">
        <div className="relative">
          <img src={profileUser.avatar} alt="Chat Avatar" className="w-32 h-32 rounded-full" />
          <button
            className="absolute -right-5 bottom-1/2 translate-y-1/2"
            onClick={() => setShowEditAvatar(true)}
            disabled={profileUser._id !== user._id || showEditAvatar}
          >
            <BsPencilFill
              style={{
                color: profileUser._id !== user._id || showEditAvatar ? "#f3f4f6" : "#9ca3af",
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
                  resetAvatar({ avatar: profileUser.avatar || "" });
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

export default ProfileAvatarModal;
