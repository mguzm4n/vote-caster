import mongoose, { Schema } from "mongoose";

export interface IQuestion {
  name: string;
  multipleChoice: boolean;
  displaySymbol: string;
  alternatives: string[];
  editable?: boolean;
}

export const questionSchema = new Schema<IQuestion>({
  name: { type: String, required: true },
  multipleChoice: { type: Boolean, required: true },
  displaySymbol: { type: String, required: true },
  alternatives: { type: [String] }, // mongo automatically defaults to []
  editable: { type: Boolean, default: false },
});

export const Question = mongoose.model<IQuestion>('Question', questionSchema);