import axios from "axios";
import { AnswerRequest } from "../utils/forms";

export function saveAnswers(collectionId: string, answers: AnswerRequest[], username: string) {
  return axios
    .put(`collections/${collectionId}/answers`, {
      username,
      answers
    });
}
