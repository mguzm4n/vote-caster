import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { Action } from '../hooks/alternativesReducer';
import { createAlternative, deleteAlternative } from '../services/alternativeService';

interface AlternativeProps {
  questionId: string;
  alternative: string;
  dispatch: React.Dispatch<Action>;
  alternativeIndex: number;
}

const Alternative = ({ alternative, alternativeIndex, questionId, dispatch }: AlternativeProps) => {
  const { collectionId } = useParams();
  const [alternativeName, setAlternativeName] = useState(alternative);
  const [onEdit, setOnEdit] = useState(false);
  
  const postMutation = useMutation({
    mutationFn: (name: string) => createAlternative(collectionId!, questionId, name),
  });

  const deleteMutation = useMutation({
    mutationFn: (index: number) => deleteAlternative(collectionId!, questionId, index),
    onSuccess: () => {
      dispatch({ type: "delete", alternativeIndex });
    }
  });

  const handleSaveAlternative = () => {
    return;
  };

  const handleDeleteAlternative = () => {
    deleteMutation.mutate(alternativeIndex);
  };


  return (
    <div className="flex gap-2 items-center">
      <p>{alternative}</p>
      <button onClick={handleSaveAlternative} title={onEdit ? "Guardar" : "Editar"}
        className="flex justify-center items-center bg-sky-400 rounded-full w-6 h-6">
        <AiOutlineEdit className="text-white text-xs" />
      </button>
      <button onClick={handleDeleteAlternative} title="Eliminar..." 
        className="flex justify-center items-center bg-rose-400 text-white text-lg p-0.5 rounded-full w-6 h-6">
        <AiOutlineDelete className="text-white text-sm " />
      </button>
    </div>
  )
};

export default Alternative;
