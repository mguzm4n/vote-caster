import { Outlet } from "react-router-dom";
import CollectionList from "../components/CollectionList";
import { MdBallot, MdOutlineBallot } from 'react-icons/md'
import { useState } from "react";
import UnderlinedTitle from "../components/UnderlinedTitle";
const Dashboard = () => {
  return (<>
    <div className="flex flex-col gap-2">
      <UnderlinedTitle
        FillIcon={<MdBallot className="text-2xl mt-0.5 ml-1" />}
        OutlineIcon={<MdOutlineBallot className="text-2xl mt-0.5 ml-1"  />}
        Text={<>Mis <span className="font-signika mt-1">colecciones</span></>}
       />
      <CollectionList />
    </div>
    <Outlet />
  </>)
};

export default Dashboard;
