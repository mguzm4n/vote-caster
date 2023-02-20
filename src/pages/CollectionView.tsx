import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import QuestionList from "../components/QuestionList";
import UnderlinedTitle from "../components/UnderlinedTitle";
import { useAuth } from "../hooks/useAuth";
import { getCollection } from "../services/collectionService";

import { BsFillCollectionFill, BsCollection } from 'react-icons/bs';
import { ReactNode } from "react";

const CollectionView = () => {
  const { collectionId } = useParams();
  const { user } = useAuth(); 
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getCollection(user?.username!, collectionId!),
    queryKey: [user?.username, "collections", collectionId],
  });

  if (isLoading) {
    return <div>Cargando vista de colleción</div>;
  }

  if (isError) {
    return <div>Error cargando la vista de la colleción {collectionId}</div>
  }

  const collection = data.data;

  if (!collection) {
    return <div>No se ha encontrado la colección especificada...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <UnderlinedTitle
        FillIcon={<BsFillCollectionFill className="text-lg mt-1.5 ml-1.5" />}
        OutlineIcon={<BsCollection className="text-lg mt-1.5 ml-1.5" />}
        Text={collection.name}
       />
      <QuestionList collectionId={collectionId!} questions={collection.questions} />
    </div>
  );
};

export default CollectionView;
