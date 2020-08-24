import User, { IUser } from "../model/user";
import bcrypt from "bcryptjs";
import { createToken } from "../helpers/token";

export async function loginService(
  body: LoginRequestBody
): Promise<{ status: number; data: any }> {
  const user: IUser | null = await User.findOne({ email: body.email });
  if (!user) {
    return {
      status: 400,
      data: { message: "User with that email doesn't exists" },
    };
  }
  const validPass = await bcrypt.compare(body.password, user.hashPassword);
  if (!validPass) {
    return { status: 400, data: { message: "Invalid password" } };
  }
  return { status: 200, data: createToken(user) };
}
