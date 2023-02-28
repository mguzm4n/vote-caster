import axios from "axios";
import { AnswerRequest } from "../utils/forms";

export function saveAnswers(collectionId: string, answers: AnswerRequest[], txtForm: { email: string, username: string }) {
  return axios
    .put(`collections/${collectionId}/answers`, {
      ...txtForm,
      answers
    });
}
