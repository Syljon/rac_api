import nodemailer from "nodemailer";
import { IUser } from "../model/user";
import { createToken } from "./token";

import config from "./config";
import Mail from "nodemailer/lib/mailer";

var transporter: Mail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.MAIL_LOGIN as string,
    pass: config.MAIL_PASSWORD as string,
  },
});

function createMailOptions(user: IUser): Mail.Options {
  const token = createToken(user);
  const link =
    (config.NODE_ENV == "development"
      ? "http://localhost:3000/"
      : config.CLIENT_HREF) +
    "set-password?token=" +
    token;
  return {
    from: config.MAIL_LOGIN as string,
    to: user.email,
    subject: "Hello",
    html: `<h2>Welcome ${user.firstName}</h2>
          <p>Please set you password
          <a href="${link}">Set password</a>
          <p>
          `,
  };
}

export function sendEmail(user: IUser) {
  try {
    const mailOptions: Mail.Options = createMailOptions(user);
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
  } catch (err) {
    throw err;
  }
}
