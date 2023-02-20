import axios from "axios";
import { type Question } from "../components/CollectionCard";

export function createQuestion(questionForm: Partial<Question>, collectionId: string) {
  return axios
    .post<Question>(`collections/${collectionId}/questions`, questionForm);
}