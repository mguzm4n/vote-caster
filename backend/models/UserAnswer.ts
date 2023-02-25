import { answerSchema, IAnswer } from "./Answer";
import mongoose, { Schema } from 'mongoose';

export interface IUserAnswer {
  username: string,
  answered: IAnswer[],
  answeredAt: Date;
  editedAt?: Date;
}

export const userAnswerSchema = new Schema<IUserAnswer>({
  username: { type: String, required: true },
  answered: { type: [answerSchema], required: true },
  answeredAt: { type: Date, required: true },
  editedAt: Date,
});

export const UserAnswer = mongoose.model<IUserAnswer>('UserAnswer', userAnswerSchema);
