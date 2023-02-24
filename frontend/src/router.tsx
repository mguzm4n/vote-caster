import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import MainLayout from "./pages/MainLayout";
import BodyLayout from "./pages/BodyLayout";

import CreateVoteForm from "./pages/CreateVoteForm";

import ProtectedRoute from "./pages/ProtectedRoute";

import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import AuthProvider from "./hooks/AuthContext";
import NewCollectionForm from "./pages/NewCollectionForm";
import { useAuth } from "./hooks/useAuth";
import CollectionView from "./pages/CollectionView";
import VotingView from "./pages/VotingView";

const loginRoute = {
  path: "sign-in",
  element: <LoginForm />
};
const registerRoute = {
  path: "sign-up",
  element: <RegisterForm />
};


const newCollectionRoute = {
  path: "collections/new",
  element: <NewCollectionForm />
};

const updateCollectionRoute = {
  path: "collections/update",
  element: <CreateVoteForm />
};

const viewCollectionRoute = {
  path: "collections/:collectionId",
  element: <CollectionView />
};


const dashboardRoute = {
  path: "dashboard",
  element: <Dashboard />,
  children: [
    newCollectionRoute,
    updateCollectionRoute
  ]
};

const protectedRoutes = {
  element: <ProtectedRoute />,
  children: [
    dashboardRoute,
    viewCollectionRoute,
  ],
};

const bodyRoute = {
  element: <BodyLayout />,
  children: [
    { path: "/voting/:collectionId", element: <VotingView/> },
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

const Public = () => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />
  }
  return(
    <Outlet />
  );
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
          {
            element: <Public />,
            children: [
              loginRoute,
              registerRoute,
            ]
          },
        ]
      }
    ],
  },
])

export default router;