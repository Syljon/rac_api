import { User, IUser } from "../model/user";
import bcrypt from "bcryptjs";
import { createToken, decodeToken } from "../helpers/token";

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

export async function setPasswordService(
  body: SetPasswordBody
): Promise<{ status: number; data: any }> {
  const { email } = decodeToken(body.token);

  const existingUser = await User.findOne({ email: email });

  if (!existingUser)
    return {
      status: 400,
      data: { message: "User with that email dosen't exists" },
    };

  existingUser.hashPassword = await bcrypt.hash(
    body.password,
    await bcrypt.genSalt(10)
  );
  existingUser.emailConfirmed = true;

  try {
    const savedUser = await existingUser.save();
    return {
      status: 200,
      data: savedUser,
    };
  } catch (err) {
    return {
      status: 500,
      data: err,
    };
  }
}
