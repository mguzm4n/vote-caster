import { createBrowserRouter, Outlet } from "react-router-dom";

import MainLayout from "./pages/MainLayout";
import BodyLayout from "./pages/BodyLayout";

import CreateVoteForm from "./pages/CreateVoteForm";

import ProtectedRoute from "./pages/ProtectedRoute";

import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import AuthProvider from "./hooks/AuthContext";
import NewCollectionForm from "./pages/NewCollectionForm";

const loginRoute = {
  path: "sign-in",
  element: <LoginForm />
};
const registerRoute = {
  path: "sign-up",
  element: <RegisterForm />
};


const newCollectionRoute = {
  path: "collection/new",
  element: <NewCollectionForm />
};

const updateCollectionRoute = {
  path: "collection/update",
  element: <CreateVoteForm />
};

const dashboardRoute = {
  path: "dashboard",
  element: <Dashboard />,
  children: [
    newCollectionRoute,
    updateCollectionRoute,
  ]
};

const protectedRoutes = {
  element: <ProtectedRoute />,
  children: [
    dashboardRoute,
  ],
};

const bodyRoute = {
  element: <BodyLayout />,
  children: [
    protectedRoutes,
  ]
};

const ContextWrapper = () => {
  return(
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
};

const router = createBrowserRouter([
  {
    element: <ContextWrapper />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          bodyRoute,
          loginRoute,
          registerRoute,
        ]
      }
    ],
  },
])

export default router;