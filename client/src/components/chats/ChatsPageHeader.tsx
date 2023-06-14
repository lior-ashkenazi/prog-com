import { useState } from "react";
import { useSelector } from "react-redux";

import { CgProfile } from "react-icons/cg";
import { ImExit } from "react-icons/im";

import { RootState } from "../../store";

import { User } from "../../types/userTypes";

import ProfileModal from "./ProfileModal";

const ChatsPageHeader = () => {
  const user: User | null = useSelector((state) => (state as RootState).app.user);

  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  return (
    <div className="bg-indigo-800 px-3 py-2 flex justify-between drop-shadow-md">
      <h1 className="font-orbitron text-2xl text-gray-50 font-semibold tracking-tighter drop-shadow-sm">
        ProgCom
      </h1>
      <div className="flex items-center justify-between gap-x-6">
        <button onClick={() => user && setShowProfileModal(true)}>
          <CgProfile style={{ color: "#f9fafb", height: "1.4rem", width: "1.4rem" }} />
        </button>
        <button className="mt-0.5">
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
