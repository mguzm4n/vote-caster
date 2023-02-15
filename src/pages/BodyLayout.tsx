import { Outlet } from "react-router-dom";

const BodyLayout = () => {
  return (
    <div className="w-3/4 h-full bg-slate-100 rounded p-2">
      <Outlet />
    </div>
  )
};

export default BodyLayout;
