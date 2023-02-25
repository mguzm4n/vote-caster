import { Question } from "../components/CollectionCard";

export type AnswerRequest = {
  questionId: string,
  alternatives: string[]
}

export function buildAnswerRequest(collectionId: string, questions: Question[], currentForm: FormData) {
  const answersMap = new Map();
  for (let [key, value] of currentForm) {
    const retrievedQuestionId = key.split("-")[1];
    const question = questions.find(question => question._id === retrievedQuestionId);

    if (!question) {
      console.log("No se ha encontrado esta pregunta");
      return null;
    }

    if (!answersMap.has(retrievedQuestionId)) {
      answersMap.set(retrievedQuestionId, []);
    }

    answersMap.get(retrievedQuestionId).push(value); 
  }

  const reqArray: AnswerRequest[] = [];
  for (let [key, value] of Array.from(answersMap)) {
    reqArray.push({
      questionId: key,
      alternatives: value
    })
  }
  return reqArray;
}