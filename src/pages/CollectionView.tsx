import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import QuestionList from "../components/QuestionList";
import { useAuth } from "../hooks/useAuth";
import { getCollection } from "../services/collectionService";

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
    <div>
      { collection.name }
      <QuestionList collectionId={collectionId!} questions={collection.questions} />
    </div>
  );
};

export default CollectionView;
