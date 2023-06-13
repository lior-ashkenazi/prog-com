import { User } from "../../types/userTypes";

interface ProfileModalUsernameProps {
  profileUser: User;
}

const ProfileModalUsername = ({ profileUser }: ProfileModalUsernameProps) => {
  return (
    <div className="h-10 flex items-center justify-center border-b-2 border-indigo-600 pb-2">
      <span className="relative font-medium text-2xl truncate">{profileUser.userName}</span>
    </div>
  );
};

export default ProfileModalUsername;
