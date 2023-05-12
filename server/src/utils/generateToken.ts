import { sign, SignOptions } from "jsonwebtoken";

export interface ITokenPayload {
  user: { _id: number };
}

export function generateToken(payload: ITokenPayload) {
  const signInOptions: SignOptions = {
    // RS256 uses a public/private key pair. The API provides the private key
    // to generate the JWT. The client gets a public key to validate the
    // signature
    algorithm: "RS256",
  };

  // generate JWT
  return sign(payload, process.env.PRIVATE_KEY!, signInOptions);
}
