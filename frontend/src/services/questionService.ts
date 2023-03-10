import axios from "axios";
import { type Question } from "../components/CollectionCard";

export type QuestionUpdateRequest = {
  title: string,
  editable: boolean,
  multiChoice: boolean,
};

export function createQuestion(questionForm: Partial<Question>, collectionId: string) {
  return axios
    .post<Question>(`collections/${collectionId}/questions`, questionForm);
}

export function deleteQuestion(questionId: String, collectionId: string) {
  return axios
    .delete<Question>(`collections/${collectionId}/questions/${questionId}`);
}

export function updateQuestion(questionId: String, collectionId: string, form: FormData) {
  const name = form.get('name') as string;
  const multi = form.get('multiChoice');
  const editable = form.get('editable');
  const req: QuestionUpdateRequest = {
    title: name ? name : '',
    multiChoice: multi ? true : false,
    editable: editable ? true : false,
  };

  return axios
    .put<Question>(`collections/${collectionId}/questions/${questionId}`, req);
}