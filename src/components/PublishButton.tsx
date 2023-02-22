import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isInputElement } from "react-router-dom/dist/dom";
import { useAuth } from "../hooks/useAuth";
import { publishCollection } from "../services/collectionService";

interface PublishButtonProps { 
  collectionId: string;
  isPublished: boolean;
}

const PublishButton = ({ isPublished, collectionId }: PublishButtonProps) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const publishMutation = useMutation({
    mutationFn: (published: boolean) => publishCollection(collectionId, published),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [user?.username, "collections", collectionId]
      })
    }
  });

  const onPublish = () => {
    const confirmed = confirm("Al aceptar, la colección se hará pública y podrás recibir respuestas");
    if (!confirmed) return;
    publishMutation.mutate(!isPublished);
  };
  return (
    <button onClick={onPublish}
      title={`Hacer ${ isPublished? 'privada' : 'pública' } la colección`}
      className="bg-[length:115%_115%] hover:animate-gradient bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 
        disabled:opacity-50 w-full rounded py-2.5 text-white font-semibold font-signika lowercase
        tracking-wide">
      {isPublished ? "Hacer privada!" : "¡Compartir!"}
    </button>
  )
};

export default PublishButton;
