import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { publishCollection } from "../services/collectionService";

interface PublishButtonProps { 
  collectionId: string;
  isPublished: boolean;
}

const PublishButton = ({ isPublished, collectionId }: PublishButtonProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const publishMutation = useMutation({
    mutationFn: (published: boolean) => publishCollection(collectionId, published),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [user?.username, "collections", collectionId],
        exact: true
      });

    }
  });

  
  const shareURI = `http://localhost:5173/voting/${collectionId}`;

  const onPublish = () => {
    const confirmed = confirm("Al aceptar, la colección se hará pública y podrás recibir respuestas");
    if (!confirmed) return;
    publishMutation.mutate(!isPublished);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareURI)
      .then(() => {
        setFocused(prev => !prev);
    });
  }

  return (<>
    <button onClick={onPublish}
      disabled={publishMutation.isLoading}
      title={`Hacer ${ isPublished? 'privada' : 'pública' } la colección`}
      className="bg-[length:115%_115%] hover:animate-gradient bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 
        disabled:opacity-50 w-full rounded py-2.5 text-white font-semibold font-signika lowercase
        tracking-wide">
      {isPublished ? "Hacer privada!" : "¡Compartir!"}
    </button>
    {isPublished && <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <button onClick={handleCopy} 
        className={`${focused ? "tracking-wider" : ""} transition-all text-sm underline underline-offset-2 font-bold text-blue-600`}>
          Copiar enlace para compartir
      </button>
      <div onClick={() => setFocused(false)} className={`break-all ${focused ? "ring-2 ring-violet-800" : ""} px-2 py-0.5 bg-white rounded`}>
        {focused
          ? <mark className="bg-blue-400 text-white w-auto">{ shareURI }</mark>
          : shareURI}
      </div>
      {focused && <div>Copiado! :)</div>}
    </div>}
  </>)
};

export default PublishButton;
