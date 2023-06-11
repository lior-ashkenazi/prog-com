import GroupParticipantsSearchBar from "./GroupParticipantsSearchBar";
import GroupParticipantsBox from "./GroupParticipantsBox";
import GroupParticipantsSearchList from "./GroupParticipantsSearchList";

const AddParticipantsWindow = () => {
  const buttonStyle = {
    color: !chatName ? "#a5b4fc" : "#312e81",
    height: "3rem",
    width: "3rem",
  };
  return (
    <div>
      <GroupParticipantsSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <GroupParticipantsBox
        participants={participants}
        handleRemoveParticipant={handleRemoveParticipant}
      />
      <GroupParticipantsSearchList
        searchQuery={searchQuery}
        participants={participants}
        handleAddParticipant={handleAddParticipant}
      />
      <div className="bg-gray-100 p-4 flex items-center justify-center">
        <button
          className="rounded-full bg-white"
          onClick={() => handleCreateGroupChat()}
          disabled={!searchQuery}
        >
          <BsArrowRightCircleFill style={} />
        </button>
      </div>
    </div>
  );
};

export default AddParticipantsWindow;
