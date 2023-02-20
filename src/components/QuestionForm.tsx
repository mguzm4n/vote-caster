import { useEffect, useRef } from "react";
import AlternativesList from "./AlternativesList";
import { Question } from "./CollectionCard";

interface QuestionFormProps {
  question: Question;
  shouldEdit: boolean;
}

const QuestionForm = ({ question, shouldEdit }: QuestionFormProps) => {
  
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameRef && nameRef.current && shouldEdit) {
      nameRef.current?.focus();
    }
  }, [nameRef, shouldEdit]);
  
  return (
    <form onSubmit={(e) => {e.preventDefault()}} className="bg-gray-200 rounded p-2 mb-2 flex flex-col items-center gap-4">
      <fieldset className="w-full">
        <label htmlFor="name" className="text-sm">Nombre de la opción/pregunta</label>
        <input className="w-full bg-white rounded p-3 focus:outline-none focus:outline-2 focus:outline-indigo-600"
          ref={nameRef} id="name" type="text"
          defaultValue={question.name}
          placeholder="Escribir título de la pregunta..."
          disabled={!shouldEdit}  />
      </fieldset>

      <AlternativesList questionId={question._id} alternatives={question.alternatives} />
      
      <button className="w-1/2 py-2 bg-sky-500 text-sm font-semibold text-white rounded-full">Guardar!</button>
    </form>
  )
};

export default QuestionForm;
