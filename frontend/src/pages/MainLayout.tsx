import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const appName = "Pollify";

  return (<>
    <Navbar />
    <div className="mt-20 flex flex-col items-center justify-center h-full">
      <Outlet />
    </div>
  </>)
};

export default MainLayout;
