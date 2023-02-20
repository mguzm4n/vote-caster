import axios from "axios";
import { Collection } from "../components/CollectionCard";
import { CollectionForm } from "../pages/NewCollectionForm";

export function createCollection(collectionForm: Partial<CollectionForm>) {
  return axios
    .post("collections", collectionForm)
    .then(response => response.data);
}

export function deleteCollection(collectionId: string) {
  return axios
    .delete("collections/" + collectionId);
}

export function getUserCollections(username: string) {
  return axios
    .get<Collection[]>(`users/${username}/collections`);
}

export function getCollection(username: string, collectionId: string) {
  return axios
    .get<Collection>("collections/" + collectionId);
}