import { Mutation, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { createCollection } from "../services/collectionService";

const initialCollectionForm = {
  name: "",
  author: "",
  createdAt: "",
};

export type CollectionForm = typeof initialCollectionForm;

const NewCollectionForm = () => {
  const { user } = useAuth();
  const [collectionName, setCollectionName] = useState("");

  const collectionMutation = useMutation(createCollection, {
    onSuccess: () => {
      
    }
  });

  const handleCollectionCreation = (e: React.FormEvent) => {
    e.preventDefault();
    collectionMutation.mutate({
      author: user?.username,
      createdAt: new Date().toString(),
      name: collectionName,
    });
  };

  return (
    <div className="w-screen h-screen z-10 absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white px-8 py-4 shadow rounded-xl max-w-lg border border-black border-opacity-5">
      <form onSubmit={handleCollectionCreation} className="flex flex-col gap-4">
       <p>{'>'} Provéenos un <span className="font-signika">nombre</span> para la colección, y se creará en un unos segundos.</p>
        <div className="flex flex-col gap-0 items-center">
          <label  className="bg-gray-200 px-4 py-1 rounded-lg z-10 -mb-2" htmlFor="name">Nombre de la colección</label>
          <input value={collectionName} onChange={(e) => setCollectionName(e.currentTarget.value)}
            className="w-[85%] rounded-lg px-3 py-2 text-center bg-gray-100" id="name" name="name" type="text" />
        </div>
        <button
          disabled={collectionMutation.isLoading}
          className="disabled:opacity-50 hover:opacity-75 w-full py-3 px-3 bg-pink-500 rounded-xl text-white font-bold tracking-wide text-sm">
            Crear!
        </button>
        {collectionMutation.isError && <div className="px-2 py-1 font-semibold text-white text-sm bg-pink-400 rounded-md">
          Hubo un error y no se ha podido crear ninguna colección! 
          Inténtalo de nuevo, por favor {':('}.
        </div>}
      </form>
      </div>
    </div>
  )
};

export default NewCollectionForm;
