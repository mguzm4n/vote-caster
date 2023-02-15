import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./pages/MainLayout";
import BodyLayout from "./pages/BodyLayout";

import CreateVoteForm from "./pages/CreateVoteForm";

import ProtectedRoute from "./pages/ProtectedRoute";

import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";

const loginRoute = {
  path: "sign-in",
  element: <LoginForm />
};
const registerRoute = {
  path: "sign-up",
  element: <RegisterForm />
};

const newVoteRoute = {
  path: "new",
  element: <CreateVoteForm />
};

const protectedRoutes = {
  element: <ProtectedRoute />,
  children: [
    newVoteRoute
  ],
};

const bodyRoute = {
  element: <BodyLayout />,
  children: [
    protectedRoutes,
  ]
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      bodyRoute,
      loginRoute,
      registerRoute,
    ]
  },
  
])

export default router;