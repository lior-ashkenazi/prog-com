import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavigateFunction } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import { ImExit } from "react-icons/im";

import { RootState, useLogoutUserMutation } from "../../../store";

import { User } from "../../../types/userTypes";

import ProfileModal from "../../../components/chats/modals/profile_modal/ProfileModal";

const ChatsPageHeader = () => {
  const user: User | null = useSelector((state) => (state as RootState).app.user);
  const [logout] = useLogoutUserMutation();
  const navigate: NavigateFunction = useNavigate();

  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  const handleLogout = async () => {
    await logout().unwrap();
    navigate("/");
  };

  return (
    <div className="bg-indigo-800 px-3 py-2 flex justify-between drop-shadow-md">
      <h1 className="font-orbitron text-2xl text-gray-50 font-semibold tracking-tighter drop-shadow-sm">
        ProgCom
      </h1>
      <div className="flex items-center justify-between gap-x-6">
        <button onClick={() => user && setShowProfileModal(true)}>
          <CgProfile style={{ color: "#f9fafb", height: "1.4rem", width: "1.4rem" }} />
        </button>
        <button className="mt-0.5" onClick={() => handleLogout()}>
          <ImExit style={{ color: "#f9fafb", height: "1.4rem", width: "1.4rem" }} />
        </button>
      </div>
      {user && (
        <ProfileModal
          user={user}
          profileUser={user}
          showProfileModal={showProfileModal}
          setShowProfileModal={setShowProfileModal}
        />
      )}
    </div>
  );
};

export default ChatsPageHeader;
