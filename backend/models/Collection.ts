import mongoose, { Schema } from "mongoose";
import { IQuestion, questionSchema } from "./Question";
import { IUserAnswer, userAnswerSchema } from "./UserAnswer";

export interface ICollection {
  name: string;
  createdAt: Date;
  author: string;
  questions: IQuestion[];
  answers: IUserAnswer[];
  isPublished: boolean;
  emails: string[];
}

const collectionSchema = new Schema<ICollection>({
  name: { type: String, required: true },
  createdAt: { type: Date, required: true },
  author: { type: String, required: true }, // username
  questions: { type: [questionSchema] },
  answers: { type: [userAnswerSchema] },
  isPublished: { type: Boolean, default: false },
  emails: { type: [String] }
});

export const Collection = mongoose.model<ICollection>('Collection', collectionSchema);


