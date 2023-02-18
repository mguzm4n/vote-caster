import { Outlet } from "react-router-dom";
import CollectionList from "../components/CollectionList";
import { MdBallot, MdOutlineBallot } from 'react-icons/md'
import { useState } from "react";
const Dashboard = () => {
  return (<>
    <div className="flex flex-col gap-2">
      <div className="group flex flex-col">
        <p className="text-2xl flex gap-1 items-center">
          <MdOutlineBallot className="mt-0.5 hidden group-hover:block" />
          <MdBallot className="mt-0.5 block group-hover:hidden" />
          Mis <span className="font-signika">colecciones</span>
        </p>
        <div className="transition-[width] group-hover:w-full hover:w-full w-[70%] h-2 bg-pink-500 rounded-tr rounded-br"></div>
      </div>
      <CollectionList />
    </div>
    <Outlet />
  </>)
};

export default Dashboard;
