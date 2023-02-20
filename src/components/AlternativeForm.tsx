import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { BiCheckDouble } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { Action } from '../hooks/alternativesReducer';
import { createAlternative } from '../services/alternativeService';

interface AlternativeProps {
  alternatives: string[];
  questionId: string;
  dispatch: React.Dispatch<Action>;
}

const AlternativeForm = ({ alternatives, questionId, dispatch }: AlternativeProps) => {
  const { collectionId } = useParams();
  const [alternativeName, setAlternativeName] = useState("");

  const postMutation = useMutation({
    mutationFn: (name: string) => createAlternative(collectionId!, questionId, name),
    onSuccess: () => {
      dispatch({ type: "add", alternative: alternativeName });
    },
  });

  const handleSaveAlternative = () => {
    if (alternatives.includes(alternativeName)) {
      return;
    }
    
    postMutation.mutate(alternativeName);
  };

  return (
    <div className="w-full justify-center flex gap-2 items-center">
      <input className="w-[80%] bg-transparent border-b-4 border-b-sky-400 px-2 py-1" 
        type="text"placeholder="Escribe una nueva alternativa..."
        value={alternativeName} onChange={e => setAlternativeName(e.currentTarget.value)} />
      <button onClick={handleSaveAlternative} title="Guardar..." className="flex justify-center  items-center bg-sky-400 text-white text-xl p-0.5 rounded w-7 h-7">
        <BiCheckDouble />
      </button>
    </div>
  )
};

export default AlternativeForm;
