import { HydratedDocument } from 'mongoose';
import { Collection } from '../models/Collection';
import { IQuestion, Question } from '../models/Question';

export async function createOne(question: IQuestion, collectionId: string) {
  try {
    const questionRes = await Question.create(question);
    const dbResponse = await Collection.updateOne(
      { _id: collectionId },
      { $push: { questions: questionRes } }
    );
    return questionRes;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function createMany(questions: IQuestion[], collectionId: string) {
  try {
    const questionsRes = await Question.insertMany(questions);
    const dbResponse = await Collection.updateOne(
      { _id: collectionId },
      { $push: { questions: questionsRes } }
    );
    return questionsRes;
  } catch (err) {
    console.error(err);
    return null;
  }
}