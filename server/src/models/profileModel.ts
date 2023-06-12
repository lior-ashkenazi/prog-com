import { Document, Schema, Types, model, Model } from "mongoose";

export interface IProfile extends Document {
  user: Schema.Types.ObjectId;
  occupation: string;
  workplace: string;
  education: string;
  github: string;
  linkedin: string;
}

const profileSchema: Schema = new Schema<IProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    occupation: {
      type: String,
      required: false,
    },
    workplace: {
      type: String,
      required: false,
    },
    education: {
      type: String,
      required: false,
    },
    github: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Profile: Model<IProfile> = model<IProfile>("Profile", profileSchema);
export default Profile;
