import jwt from "jsonwebtoken";
import { IUser } from "../model/user";
import config from "./config";

export function createToken(user: IUser): string {
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
}

export function decodeToken(token: string): any {
  return jwt.decode(token);
}
