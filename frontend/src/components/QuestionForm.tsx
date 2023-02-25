import { useEffect, useRef } from "react";
import { QuestionState } from "../hooks/questionsReducer";
import AlternativesList from "./AlternativesList";
import { Question } from "./CollectionCard";
import SwitchInput from "./SwitchInput";

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
      <fieldset className="flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="flex gap-2 items-center justify-center">
          <label htmlFor="multiChoice">Permitir alternativa múltiple</label>
          {/* <input id="multiChoice" type="checkbox" defaultChecked={question.multipleChoice} /> */}
          <SwitchInput nameId="multiChoice"/>
        </div>
        <div className="flex gap-2 items-center justify-center">  
          <label htmlFor="editable">Permitir edición</label>
          {/* <input id="editable" type="checkbox" defaultChecked={question.multipleChoice} /> */}
          <SwitchInput nameId="editable"/>
        </div>
      </fieldset>

      <AlternativesList questionId={question._id} alternatives={question.alternatives} />
      
      <button className="border-2 border-sky-500 hover:bg-white hover:text-sky-500 w-1/2 py-1.5 bg-sky-500 text-sm font-semibold text-white rounded-full">
        Guardar!
      </button>
    </form>
  )
};

export default QuestionForm;
