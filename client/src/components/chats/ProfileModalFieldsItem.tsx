import { useState, useEffect } from "react";

import { BsPencilFill, BsX, BsCheck2 } from "react-icons/bs";

import { User } from "../../types/userTypes";
import { Profile } from "../../types/profileTypes";
import { isKeyOfProfile } from "../../store/apis/types/profileEndpointsTypes";

interface ProfileModalFieldsItemProps {
  user: User;
  profile: Profile;
  field: string;
  editFields: { [key: string]: boolean } | undefined;
  setEditFields: React.Dispatch<
    React.SetStateAction<
      | {
          [key: string]: boolean;
        }
      | undefined
    >
  >;
  handleFieldSubmit: (field: string, value: string) => Promise<void>;
}

const ProfileModalFieldsItem = ({
  profile,
  field,
  editFields,
  setEditFields,
  handleFieldSubmit,
}: ProfileModalFieldsItemProps) => {
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    isKeyOfProfile(field, profile) && field !== "user" && setInput(profile[field]);
  }, [profile, field]);

  return (
    <li className="h-8 flex items-center justify-between">
      <span className="flex items-center justify-center gap-x-3">
        <span className="font-semibold">{`${field.charAt(0).toUpperCase()}${field.slice(
          1
        )}:`}</span>
        {editFields && editFields[field] ? (
          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              handleFieldSubmit(field, input);
            }}
          >
            <div className="relative items-center justify-center w-48">
              <input
                id={`Profile field ${field}`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
                className="px-1 py-0.5 w-full rounded border-2 bg-gray-200 focus:bg-gray-50 focus:outline-none focus:shadow-outline focus:border-indigo-400 transition-colors"
                placeholder={`Enter ${field}`}
                type="text"
              ></input>
              <span className="absolute -right-10 bottom-2 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setEditFields(
                      (prevEditFields) => prevEditFields && { ...prevEditFields, [field]: false }
                    );
                    isKeyOfProfile(field, profile) && field !== "user" && setInput(profile[field]);
                  }}
                >
                  <BsX style={{ color: "#9ca3af", height: "1.2rem", width: "1.2rem" }} />
                </button>
                <button type="submit">
                  <BsCheck2 style={{ color: "#9ca3af", height: "1.2rem", width: "1.2rem" }} />
                </button>
              </span>
            </div>
          </form>
        ) : (
          isKeyOfProfile(field, profile) &&
          field !== "user" && <span className="w-48 truncate">{profile[field]}</span>
        )}
      </span>
      {!(editFields && editFields[field]) && (
        <button
          onClick={() =>
            setEditFields(
              (prevEditFields) => prevEditFields && { ...prevEditFields, [field]: true }
            )
          }
        >
          <BsPencilFill
            style={{
              color: "#9ca3af",
              height: "0.8rem",
              width: "0.8rem",
            }}
          />
        </button>
      )}
    </li>
  );
};

export default ProfileModalFieldsItem;
