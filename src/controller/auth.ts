import User, { IUser } from "../model/user";
import bcrypt from "bcryptjs";
import { createToken, decodeToken } from "../helpers/token";

type RequestBody = {
  email: string;
  password: string;
};

type SETPAsswordBody = {
  token: string;
  password: string;
  password2: string;
};

export async function login(req: any, res: any) {
  const body = req.body as RequestBody;
  const user: IUser | null = await User.findOne({ email: body.email });
  if (!user) {
    return res.status(400).send({ message: "User with that email exists" });
  }
  const validPass = await bcrypt.compare(body.password, user.hashPassword);
  if (!validPass) {
    return res.status(400).send({ message: "Invalid password" });
  }
  const token = createToken(user);
  return res.header("auth-token", token).send(token);
}

export async function setPassword(req: any, res: any) {
  const body = req.body as SETPAsswordBody;
  const { email } = decodeToken(body.token);

  const existingUser = await User.findOne({ email: email });

  if (!existingUser)
    return res.status(400).send("User with that email dosne't exists");

  existingUser.hashPassword = await bcrypt.hash(
    body.password,
    await bcrypt.genSalt(10)
  );
  existingUser.emailConfirmed = true;

  try {
    const savedUser = await existingUser.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
}
