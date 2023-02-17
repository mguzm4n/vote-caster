import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  // const mutation = useMutation(logout, {
  //   onError: (error: AxiosError) => {
  //     if (error.response?.status == 401) {
  //       setUser(null);
  //       navigate("/");
  //     }
  //   },
  //   onSuccess: () => {
  //     setUser(null);
  //     navigate("/");
  //   }
  // });

  return (
    <div className="fixed top-0 w-full h-14 bg-gray-50 shadow-md border border-b-2 p-2 flex items-center justify-between">
      <span className="transition-all font-signika font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 hover:cursor-pointer hover:bg-[30px] duration-500">
        Pollify
      </span>
      <div>
        {user 
        ? <>Conectado - Logout</>
        : <div className="flex gap-2">
            <Link to="/sign-in"
              className="hover:opacity-75 font-medium text-sm tracking-wide px-3 py-1 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white rounded-lg">
              Entrar
            </Link>
            <Link to="/sign-up"
              className="hover:opacity-75 font-medium text-sm tracking-wide px-3 py-1 bg-sky-500 text-white rounded-lg">
              Regístrame
            </Link>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
