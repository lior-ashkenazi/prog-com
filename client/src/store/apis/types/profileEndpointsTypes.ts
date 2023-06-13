import { Profile } from "../../../types/profileTypes";

export type FetchProfileRequest = string;
export type FetchProfileResponse = {
  profile: Profile;
};

export type UpdateProfileRequest = {
  user: string;
  avatar?: string;
  occupation?: string;
  workplace?: string;
  education?: string;
  github?: string;
  linkedin?: string;
};
export type UpdateProfileResponse = {
  profile: Profile;
};

export function isKeyOfProfile(key: string, profile: Profile): key is keyof Profile {
  return key in profile;
}
