import User, { IUser } from "../model/user";
import { sendEmail } from "../helpers/email";

type RequestParams = { id: string };

type RequestBody = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export async function getUsers(req: any, res: any) {
  try {
    const users: IUser[] = await User.find();
    return res.status(200).send(users);
  } catch (err) {
    res.status(400).send({ message: err });
  }
}

export async function getUser(req: any, res: any) {
  try {
    const params = req.params as RequestParams;
    const uid = params.id;
    const user: IUser | null = await User.findOne({ _id: uid });
    if (user) {
      return res.status(200).send(user);
    }
    return res.status(404).send({ message: "qwe" });
  } catch (err) {
    res.status(400).send({ message: err });
  }
}

export async function postUser(req: any, res: any) {
  const body = req.body as RequestBody;
  const emailExist = await User.findOne({ email: body.email });

  if (emailExist)
    return res.status(400).send("User with that email already exists");

  const user: IUser = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    role: body.role,
  });
  try {
    const savedUser = await user.save();
    sendEmail(savedUser);
    res.status(201).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
}
