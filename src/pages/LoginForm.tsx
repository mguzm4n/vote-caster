import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { login } from "../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [authForm, setAuthForm] = useState({ email: '', password: ''});

  const setTxtInput = (key: string, value: string) => {
    setAuthForm({...authForm, [key]: value});
  };

  const mutation = useMutation(login, {
    onSuccess: (user) => {
      setUser(user);
      setTimeout(() => navigate("/dashboard"), 1 * 1000);
    }
  });

  const submitLogin = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    mutation.mutate(authForm);
  };

  const errorMsg = () => {
    if (mutation.isError && mutation.error instanceof AxiosError) {
      return mutation.error.response?.data.msg as string;
    }
    return null;
  }

  return (
    <div className="w-full md:h-screen flex justify-center">
      <div className="w-[95%] md:flex-row md:w-[80%] h-[80%] flex flex-col shadow ">
        <form onSubmit={submitLogin} className="bg-white w-full md:w-[40%] h-full py-10 md:py-0 px-12 flex flex-col justify-center gap-2">
          <div className="mb-12">
            <p className="font-bold text-2xl ">Inicia sesión</p>
            <p className="text-sm text-gray-600">
              Estás iniciando sesión como <span className="text-blue-600 font-semibold">usuario</span>.
              Conéctate para ver las estadísticas de tus encuestas y votaciones.
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm" htmlFor="email">Email</label>
            <input 
              onChange={e => setTxtInput('email', e.target.value)} 
              value={authForm.email}
              className="bg-gray-50 border-b border-b-gray-200 px-2 py-1.5 outline-none focus:ring-2 focus:rounded-md focus:ring-violet-400" 
              name="email" id="email" type="email" />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm"htmlFor="password">Contraseña</label>
            <input onChange={e => setTxtInput('password', e.target.value)} 
              value={authForm.password}
              className="bg-gray-50 border-b border-b-gray-200 px-2 py-1.5 outline-none focus:ring-2 focus:rounded-md focus:ring-violet-400" 
              name="password" id="password" type="password" />
          </div>
          <p className="text-blue-700 text-sm font-bold">¿Contraseña olvidada?</p>
          <div className="flex flex-col gap-2.5">
            <button disabled={mutation.isLoading}
              type="submit" className="disabled:opacity-50 px-3 py-1.5 text-sm font-medium tracking-wide text-white bg-violet-600 rounded-lg">
              Iniciar sesión
            </button>
            <Link to="/sign-up"
              className="px-3 py-1.5 text-sm font-medium tracking-wide border border-gray-300 rounded-lg text-center">
              Registrarse
            </Link>
          </div>
          { errorMsg() }
        </form>
        <div className="bg-violet-300 h-52 w-full md:w-[60%] md:h-full">
        </div>
      </div>
    </div>
  )
};

export default LoginForm;
