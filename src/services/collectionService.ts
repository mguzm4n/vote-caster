import axios from "axios";
import { CollectionForm } from "../pages/NewCollectionForm";

export function createCollection(collectionForm: Partial<CollectionForm>) {
  return axios
    .post("collections", collectionForm)
    .then(response => response.data);
}