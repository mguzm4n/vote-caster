import axios from "axios";
import { type Question } from "../components/CollectionCard";

export function createQuestion(questionForm: Partial<Question>, collectionId: string) {
  return axios
    .post<Question>(`collections/${collectionId}/questions`, questionForm);
}

export function deleteQuestion(questionId: String, collectionId: string) {
  return axios
    .delete<Question>(`collections/${collectionId}/questions/${questionId}`);
}