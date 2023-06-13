import { useEffect, useState, useMemo } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { BsPencilFill } from "react-icons/bs";

import { useFetchProfileQuery, useUpdateProfileMutation } from "../../store";

import { User } from "../../types/userTypes";
import { Profile } from "../../types/profileTypes";
import ProfileModalFieldsItem from "./ProfileModalFieldsItem";
import { isKeyOfProfile } from "../../store/apis/types/profileEndpointsTypes";

interface ProfileModalFieldsProps {
  user: User;
  profileUser: User;
}

const ProfileModalFields = ({ user, profileUser }: ProfileModalFieldsProps) => {
  const {
    data,
    isLoading: isLoadingProfile,
    isFetching: isFetchingProfile,
    refetch: refetchProfile,
  } = useFetchProfileQuery(profileUser._id);
  const [updateProfile] = useUpdateProfileMutation();

  const [profile, setProfile] = useState<Profile | null>(null);

  const [editFields, setEditFields] = useState<{ [key: string]: boolean }>();

  const profileFields = useMemo(
    () => ["occupation", "workplace", "education", "github", "linkedin"],
    []
  );

  useEffect(() => {
    refetchProfile();
  }, [refetchProfile, profileUser]);

  useEffect(() => {
    if (data?.profile) {
      let freshProfile: Profile = data?.profile;
      profileFields.forEach((field) => {
        if (!isKeyOfProfile(field, freshProfile)) freshProfile = { ...freshProfile, [field]: "" };
      });
      setProfile(freshProfile);

      setEditFields(
        profileFields.reduce((obj, field) => {
          return {
            ...obj,
            [field]: false,
          };
        }, {})
      );
    }
  }, [data, profileFields]);

  const handleFieldSubmit = async (field: string, value: string) => {
    const request = { user: profileUser._id, [field]: value };
    await updateProfile(request).unwrap();
    setEditFields((prevEditFields) => prevEditFields && { ...prevEditFields, [field]: false });
  };

  const renderList = () =>
    profile &&
    profileFields.map((field, index) => (
      <ProfileModalFieldsItem
        key={index}
        user={user}
        profile={profile}
        field={field}
        editFields={editFields}
        setEditFields={setEditFields}
        handleFieldSubmit={handleFieldSubmit}
      />
    ));

  const renderSkeleton = () =>
    Array.from({ length: 5 }, (_, index) => <Skeleton key={index} height={28} className="mb-4" />);

  return !isLoadingProfile && !isFetchingProfile && profile ? (
    <div className="h-80 p-6">
      <ul className="flex flex-col gap-y-6 text-lg mt-1.5">{renderList()}</ul>
    </div>
  ) : (
    <div className="h-80 p-6">{renderSkeleton()}</div>
  );
};

export default ProfileModalFields;
