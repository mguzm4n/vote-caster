import QuestionView from "./Question";
import { BsPlusLg } from 'react-icons/bs';
import { useReducer } from "react";

import { type Question } from "./CollectionCard";
import { questionsReducer, initialState, QuestionState } from "../hooks/questionsReducer";
import { useMutation } from "@tanstack/react-query";
import { createQuestion } from "../services/questionService";
import QuestionToolButtons from "./QuestionToolButtons";

interface QuestionListProps {
  questions: QuestionState[];
  collectionId: string;
}

const QuestionList = ({ questions, collectionId }: QuestionListProps) => {
  const [state, dispatch] = useReducer(questionsReducer, { 
    ...initialState,
    questions: questions.map(q => ({ ...q, expand: false })),
  });

  const questionMutation = useMutation({
    mutationFn: (variables: Partial<Question>) => createQuestion(variables, collectionId),
    onSuccess: (response) => {
      const question = response.data;
      dispatch({ type: "add", payload: { question: {...question, expand: true} } });
    }
  })

  const handleAddQuestionBtn = () => {
    questionMutation.mutate({
      name: `Pregunta N°${state.questions.length + 1}`
    });
  };  

  return (
    <div className="w-full flex flex-col gap-2">
      {state.questions.length > 0 && <QuestionToolButtons dispatch={dispatch} />}
      {state.questions.length == 0 && 
        <div>
          Intenta añadir una nueva opción o pregunta a esta colección.
        </div>}
      <button disabled={questionMutation.isLoading} onClick={handleAddQuestionBtn} title="Crear colección" 
        className="mt-2 group w-full py-3 rounded bg-gray-300 flex justify-center">
        <BsPlusLg className="group-disabled:animate-spin text-xl text-white" />
      </button>
      
      <div className="flex flex-col gap-2">
        {state.questions.map((question, idx) => {
          return <QuestionView
            dispatch={dispatch} 
            key={question._id} 
            question={question} />
        })}
      </div>
    </div>
  )
};

export default QuestionList;
