import { User } from "./userTypes";

export type Profile = {
  _id: string;
  user: User;
  occupation: string;
  workplace: string;
  education: string;
  github: string;
  linkedin: string;
};
