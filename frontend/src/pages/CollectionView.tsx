import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import QuestionList from "../components/QuestionList";
import UnderlinedTitle from "../components/UnderlinedTitle";
import { useAuth } from "../hooks/useAuth";
import { getCollection } from "../services/collectionService";

import { BsFillCollectionFill, BsCollection } from 'react-icons/bs';

import { useMemo } from "react";
import { formatDate } from "../utils/time";
import PublishButton from "../components/PublishButton";

const CollectionView = () => {
  const { collectionId } = useParams();
  const { user } = useAuth(); 
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getCollection(user?.username!, collectionId!),
    queryKey: [user?.username, "collections", collectionId],
  });

  const createdAt = useMemo(() => {
    const collection = data?.data;
    if (!collection) return '';
    return formatDate(collection.createdAt);
  }, [isLoading]);

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
      <div>
        <UnderlinedTitle
          FillIcon={<BsFillCollectionFill className="text-lg mt-1.5 ml-1.5" />}
          OutlineIcon={<BsCollection className="text-lg mt-1.5 ml-1.5" />}
          Text={collection.name}
         />
         <p className="flex items-center gap-1 font-medium text-sm">
          Creado a las { createdAt }.
         </p>
      </div>
      <QuestionList collectionId={collectionId!} questions={collection.questions} />
      
      <PublishButton isPublished={collection.isPublished} collectionId={collection._id} />
    </div>
  );
};

export default CollectionView;
