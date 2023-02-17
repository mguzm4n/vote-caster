import axios from "axios";
import { User } from "../hooks/AuthContext";
import { RegisterForm } from "../pages/RegisterForm";

export function login(authForm: { username: string, password: string }) {
  return axios
    .post<User>("auth/login", authForm)
    .then(response => response.data);
}

export function register(registerForm: RegisterForm) {
  return axios
    .post("users", registerForm)
    .then(response => response.data);
}