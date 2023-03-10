import { Request, Response } from "express";
import { z } from "zod";
import { Collection } from "../models/Collection";

type AnswerRequest = {
  questionId: string,
  alternatives: string[]
}

export async function saveAnswers(req: Request, res: Response) {
  const { collectionId } = req.params;
  const answers: AnswerRequest[] = req.body.answers;
  const { email, username } : { email: string, username: string }= req.body;

  if (!email || !username || username.length <= 3) {
    return res.status(400).send(`Email and Username are required or are too short`);
  }

  if (!z.string().email().safeParse(email).success) {
    return res.status(400).send(`Invalid email`);
  }

  try {
    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return res.status(404).send("Error finding collection " + collectionId);
    }
    if (collection.questions?.length !== answers.length) {
      return res.status(400).send(`Collection ${collectionId} require all questions to be answered`);
    }

    if (collection.emails.includes(email)) {
      return res.status(400).send(`Collection ${collectionId} already registered this email`);
    }
    
    for (let answer of answers) {
      const question = collection.questions?.find(q => q._id.toString() === answer.questionId);
      const questionString = `Question with id ${answer.questionId}`
      if (!question) {
        return res.status(404).send(`${questionString} does not exist`);
      }

      if (answer.alternatives.length == 0) {
        return res.status(400).send(`${questionString} needs at least one alternative answered`);
      }

      if (!question.multipleChoice && answer.alternatives.length > 1) {
        return res.status(400).send(`${questionString} does not allow multiple choice provided`);
      }

      if (
          question.multipleChoice && 
          (answer.alternatives.length > question.alternatives.length)
        ) {
          return res.status(400).send(`${questionString} has more answers than required`);
      }

      for (let alternative of question.alternatives) {
        if (!question.alternatives.includes(alternative)) {
          return res.status(400).send(`${questionString} does not allow '${alternative}' as answer`);
        }
      }
    }
    const userAnswer = {
      username,
      answered: answers,
      answeredAt: new Date(),
    };

    const currentCollection = await Collection.findById(collectionId);
    if (!currentCollection) {
      return res.status(404).send("Error finding collection " + collectionId);
    }

    for (let answer of currentCollection.answers!) {
      if (answer.username == username) {
        return res.status(400).send(`${username} already taken`)
      }
    }

    await Collection.updateOne({ _id: collectionId }, {
      $push: { "answers": userAnswer, "emails": email }
    }).exec();

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: `Error in database for answering question with id + ${collectionId}`,
      errorDetail: error
    });
  }
}