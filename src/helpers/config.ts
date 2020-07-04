import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT as string,
  DB_CONNECT: process.env.DB_CONNECT as string,
  TOKEN_SECRET: process.env.TOKEN_SECRET as string,
  MAIL_LOGIN: process.env.MAIL_LOGIN as string,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD as string,
  CLIENT_HREF: process.env.CLIENT_HREF as string,
};
