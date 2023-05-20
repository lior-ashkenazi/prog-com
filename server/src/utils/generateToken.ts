import { Schema } from "mongoose";
import { sign, SignOptions } from "jsonwebtoken";

export interface ITokenPayload {
  user: { _id: Schema.Types.ObjectId };
}

export function generateToken(payload: ITokenPayload) {
  const privateKey = process.env.PRIVATE_KEY!;

  const signInOptions: SignOptions = {
    // RS256 uses a public/private key pair. The API provides the private key
    // to generate the JWT. The client gets a public key to validate the
    // signature
    algorithm: "RS256",
  };

  console.log(payload, privateKey, signInOptions);

  // generate JWT
  return sign(payload, privateKey, signInOptions);
}
