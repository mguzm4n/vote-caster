import mongoose, { Schema } from "mongoose";

export interface IAnswer {
  questionId: string;
  alternatives: string[];
}

export const answerSchema = new Schema<IAnswer>({
  questionId: { type: String, required: true },
  alternatives: { type: [String], required: true }, 
});

export const Answer = mongoose.model<IAnswer>('Answer', answerSchema);