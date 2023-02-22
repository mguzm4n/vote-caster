import { createContext, Dispatch, ReactNode, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export type User = {
  id: number,
  username: string,
  email: string,
  role?: string,
};

type Nullable<T> = T | null

export type AuthCtx = {
  user: Nullable<User>,
  setUser: Dispatch<Nullable<User>>,
}

export const AuthContext = createContext<AuthCtx>({
  user: null,
  setUser: () => {}
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem("user");
  const [user, setUser] = useState<Nullable<User>>(
    userStr 
    ? JSON.parse(userStr)
    : null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const handleError = (error: any) => {
      console.log('UNAUTHORIZED');
      if (error.response.status == 401) {
        setUser(null);
        navigate("/", {
          replace: true
        })
      }
      return Promise.reject(error);
    }
    axios.interceptors.response.use(
      response => response,
      handleError
    );
  }, []);

  function logout() {
    
  }

  function login() {
    
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
     { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;