import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { deleteCollection } from "../services/collectionService";

export type Question = {
  _id: string,
  name: string,
  multipleChoice: boolean,
  displaySymbol: string,
  alternatives: string[],
};

export type Collection = {
  _id: string,
  name: string,
  createdAt: string,
  questions: Question[],
};

interface CollectionCardProps {
  children?: ReactNode;
  collection?: Collection;
}

const CollectionCard = ({ children, collection }: CollectionCardProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const collectionMutation = useMutation(deleteCollection, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [user?.username, "collections"]
      });
    },
    onError: () => {
      alert("No se pudo completar la eliminación de la colección...");
    }
  });
  
  const onDeleteCollection = () => {
    const wantDeleted = confirm("Está a punto de eliminar una colección creada. ¿Estás seguro? No hay vuelta atrás.");
    if (!wantDeleted) {
      return;
    }
    if (collection) {
      collectionMutation.mutate(collection._id);
    }
  };

  return (
    <div className="transition-transform duration-150 hover:scale-[102%] h-36 flex flex-col gap-2 bg-gray-300 rounded-lg items-center px-2 pt-1 pb-2">
      {!collection && 
        <>{children}</>
      }
      {collection && 
        <div className="w-full h-full flex flex-col justify-between">
          <Link to={`/collections/${collection._id}`}>{ collection.name }</Link>
          <button onClick={onDeleteCollection}
            title="Eliminar colección" className="pointer-events-auto self-end hover:shadow-none hover:opacity-50 w-7 h-7 shadow bg-transparent rounded-full flex items-center justify-center">
            <AiFillDelete className="fill-rose-600 text-lg" />
          </button>
        </div>}
    </div>
  )
};

export default CollectionCard;
