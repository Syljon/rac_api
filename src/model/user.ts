import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  hashPassword: string;
  role: string;
  creationDate: Date;
  emailConfirmed: boolean;
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max: 30,
  },
  lastName: {
    type: String,
    required: true,
    max: 60,
  },
  email: {
    type: String,
    required: true,
    max: 255,
  },
  hashPassword: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    max: 20,
    default: "User",
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  emailConfirmed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const User = mongoose.model<IUser>("User", userSchema);
