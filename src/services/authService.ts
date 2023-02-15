import axios from "axios";
import { User } from "../hooks/AuthContext";

export function login(authForm: { email: string, password: string }) {
  return axios
    .post<User>("auth", authForm)
    .then(response => response.data);
}