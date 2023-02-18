import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getUserCollections } from "../services/collectionService";
import CollectionCard from "./CollectionCard";

const CollectionList = () => {
  const { user } = useAuth();
  const collectionsQuery = useQuery({
    queryFn: () => getUserCollections(user?.username!),
    queryKey: [user?.username, "collections"],
  });

  if (collectionsQuery.isLoading) {
    return <div>Loading user collections...</div>
  }

  if (collectionsQuery.isError) {
    return <div>Error loading user collections... Retry in a second.</div>
  }

  const collections = collectionsQuery.data.data;
  return (<>
    {(collections.length == 0) && <div className="p-2 w-ful h-full bg-gray-300 rounded">
      <p>¡Aún no hay ninguna pregunta creada en esta colección!</p>
      <p>Comienza <Link to="collection/new" className="underline inline">añadiendo al menos una</Link> para enviar una votación.</p>
    </div>}
    <div className="grid grid-cols-4 gap-3">
      {
        collections?.map(collection => (
          <CollectionCard key={collection._id} collection={collection} />
        ))
      }
      <CollectionCard>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Link title="Crear colección" to="collection/new" className="hover:opacity-50 rounded-full bg-gray-400 w-12 h-12 font-bold text-3xl text-white flex items-start justify-center">
            +
          </Link>
        </div>
      </CollectionCard>
    </div>
  </>)
};

export default CollectionList;
