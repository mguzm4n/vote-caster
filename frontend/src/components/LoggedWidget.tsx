import { useAuth } from "../hooks/useAuth";
import { logout } from "../services/authService";
import { useMutation } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const LoggedWidget = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const lockState = () => {
    setUser(null);
    navigate("/");
  }

  const logOutMutation = useMutation({
    mutationFn: logout,
    onError: (error: AxiosError) => {
      if (error.response?.status == 401) {
        lockState()
      }
    },
    onSuccess: () => lockState()
  });

  return (
    <div>
      <button title="Estarás cerrando la sesión actual..."
        disabled={logOutMutation.isLoading}
        onClick={() => logOutMutation.mutate()}
        className="hover:bg-[length:400%_400%] px-4 py-0.5 tracking-wider rounded
          hover:animate-gradient
          disabled:opacity-50
          bg-gradient-to-tl from-indigo-300 to-purple-400 text-white font-bold font-signika text-sm">
        Salir!
      </button>
    </div>
  )
};

export default LoggedWidget;
