import mongoose, { Schema } from "mongoose";

export interface IAnswer {
  questionIndex: number;
  alternativeIndex: number;
  answeredAt: Date;
  editedAt: Date;
}

export const answerSchema = new Schema<IAnswer>({
  questionIndex: { type: Number, required: true },
  alternativeIndex: { type: Number, required: true }, 
  answeredAt: { type: Date, required: true },
  editedAt: Date,
});

export const Answer = mongoose.model<IAnswer>('Answer', answerSchema);