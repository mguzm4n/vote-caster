import mongoose, { Schema } from "mongoose";
import { IQuestion, questionSchema } from "./Question";
import { IUserAnswer, userAnswerSchema } from "./UserAnswer";

export interface ICollection {
  createdAt: Date;
  author: string;
  questions?: IQuestion[];
  answers?: IUserAnswer[];
}

const collectionSchema = new Schema<ICollection>({
  createdAt: { type: Date, required: true },
  author: { type: String, required: true }, // username
  questions: { type: [questionSchema] },
  answers: { type: [userAnswerSchema] },
});

export const Collection = mongoose.model<ICollection>('Collection', collectionSchema);


