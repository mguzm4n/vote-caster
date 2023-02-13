import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  roles: {
    User: { type: Number, default: 1 }
  },
  password: { type: String, required: true },
});

export const User = mongoose.model('User', userSchema);

const questionSchema = new Schema({
  name: { type: String, required: true },
  multipleChoice: { type: Boolean, required: true },
  displaySymbol: { type: String, required: true },
  alternatives: { type: [String] }, // mongo automatically defaults to []
});

export const Question = mongoose.model('Question', questionSchema);

const answerSchema = new Schema({
  question: { type: questionSchema, required: true },
  alternativeMarked: { type: String, required: true }, // mongo automatically defaults to []
});

export const Answer = mongoose.model('Answer', questionSchema);

const userAnswerSchema = new Schema({
  user: { type: userSchema, required: true },
  answers: { type: [answerSchema], required: true },
});

export const UserAnswer = mongoose.model('UserAnswer', questionSchema);


const collectionSchema = new Schema({
  createdAt: { type: Date, required: true },
  author: { type: String, required: true }, // username
  questions: { type: [questionSchema] },
  answers: { type: [userAnswerSchema] },
});

export const Collection = mongoose.model('Collection', collectionSchema);


