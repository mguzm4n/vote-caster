import { Outlet } from "react-router-dom";
import CollectionCard from "../components/CollectionCard";

const Dashboard = () => {
  return (<>
    <div className="flex flex-col gap-2">
        <div>
          Mis colecciones
        </div>
        <div className="p-2 w-ful h-full bg-gray-300 rounded">
          <p>
            ¡Aún no hay ninguna pregunta creada en esta colección!
          </p>
          <p>
            Comienza <button className="underline inline">añadiendo al menos una</button> para enviar una votación.
          </p>
        </div>
        <div className="grid grid-cols-4">
          <CollectionCard to="collection/new">
            <div className="hover:opacity-50 rounded-full bg-gray-400 w-12 h-12 font-bold text-3xl text-white flex items-start justify-center">
              <span className="mt-0.5">+</span>
            </div>
          </CollectionCard>
        </div>
    </div>
    <Outlet />
  </>)
};

export default Dashboard;
