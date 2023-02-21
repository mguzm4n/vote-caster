import { useEffect, useRef } from "react";
import { QuestionState } from "../hooks/questionsReducer";
import AlternativesList from "./AlternativesList";
import { Question } from "./CollectionCard";

interface QuestionFormProps {
  question: QuestionState;
}

const QuestionForm = ({ question }: QuestionFormProps) => {
  
  return (
    <form onSubmit={(e) => {e.preventDefault()}} className="bg-gray-200 rounded p-2 mb-2 flex flex-col items-center gap-4">
      <fieldset className="w-full">
        <label htmlFor="name" className="text-sm">Nombre de la opción/pregunta</label>
        <input autoFocus className="w-full bg-white rounded p-3 focus:outline-none focus:outline-2 focus:outline-indigo-600"
           id="name" type="text"
          defaultValue={question.name}
          placeholder="Escribir título de la pregunta..."
         />
      </fieldset>

      <AlternativesList questionId={question._id} alternatives={question.alternatives} />
      
      <button className="w-1/2 py-2 bg-sky-500 text-sm font-semibold text-white rounded-full">Guardar!</button>
    </form>
  )
};

export default QuestionForm;
