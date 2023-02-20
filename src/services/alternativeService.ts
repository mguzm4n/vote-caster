import axios from "axios";

export function createAlternative(collectionId: string, questionId: string, alternativeName: string) {
  return axios
    .post(`collections/${collectionId}/questions/${questionId}/alternatives`, {
      alternative: alternativeName
    });
}


export function deleteAlternative(collectionId: string, questionId: string, index: number) {
  return axios
    .delete(`collections/${collectionId}/questions/${questionId}/alternatives/${index}`);
}


export function updateAlternatives(collectionId: string, questionId: string, alternatives: string[]) {
  return axios
    .put(`collections/${collectionId}/questions/${questionId}/alternatives`, {
      alternatives: alternatives
    });
}
