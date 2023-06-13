import { User } from "../../types/userTypes";

import ModalWrapper from "./ModalWrapper";
import ProfileModalAvatar from "./ProfileModalAvatar";
import ProfileModalUsername from "./ProfileModalUsername";
import ProfileModalFields from "./ProfileModalFields";

interface ProfileModalProps {
  user: User;
  profileUser: User;
  showProfileModal: boolean;
  setShowProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileModal = ({
  user,
  profileUser,
  showProfileModal,
  setShowProfileModal,
}: ProfileModalProps) => {
  const children = (
    <>
      <ProfileModalAvatar user={user} profileUser={profileUser} />
      <ProfileModalUsername profileUser={profileUser} />
      <ProfileModalFields user={user} profileUser={profileUser} />
    </>
  );
  return (
    <ModalWrapper
      showModal={showProfileModal}
      setShowModal={setShowProfileModal}
      headerTitle={profileUser.userName}
    >
      {children}
    </ModalWrapper>
  );
};

export default ProfileModal;
