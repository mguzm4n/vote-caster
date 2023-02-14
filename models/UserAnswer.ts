import { answerSchema, IAnswer } from "./Answer";
import mongoose, { Schema } from 'mongoose';

export interface IUserAnswer {
  username: string,
  answers: IAnswer[],
}

export const userAnswerSchema = new Schema<IUserAnswer>({
  username: { type: String, required: true },
  answers: { type: [answerSchema], required: true },
});

export const UserAnswer = mongoose.model<IUserAnswer>('UserAnswer', userAnswerSchema);
