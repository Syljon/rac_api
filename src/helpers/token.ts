import jwt from "jsonwebtoken";
import { IUser } from "../model/user";
import config from "./config";

export function createToken(user: IUser): string {
  try {
    return jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      config.TOKEN_SECRET
    );
  } catch (err) {
    throw err;
  }
}

export function decodeToken(token: string): any {
  return jwt.decode(token);
}
