import { useEffect, useRef } from "react";
import { AiFillDelete, AiOutlineExpandAlt } from "react-icons/ai";
import { Question } from "./CollectionCard";

interface QuestionViewProps {
  question: Question;
  shouldEdit?: boolean;
}

const QuestionView = ({ question, shouldEdit = false }: QuestionViewProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (nameRef && nameRef.current && shouldEdit) {
      nameRef.current?.focus();
    }
  }, [nameRef, shouldEdit]);
  
  return (<div className="flex gap-2">
    <div className="w-[80%]">
      <form>
        <input className="w-full bg-white rounded px-2 py-2"
          ref={nameRef} id="name" type="text"
          defaultValue={question.name} />
      </form>
    </div>
    <div className="w-[20%] flex justify-center gap-2">
      <button title="Ver pregunta completa" className="w-full flex justify-center items-center px-2 bg-sky-200 rounded">
        <AiOutlineExpandAlt className="fill-sky-500 text-lg" />
      </button>
      <button title="Eliminar esta pregunta" className="w-full flex justify-center items-center px-2 bg-rose-200 rounded">
        <AiFillDelete className="fill-rose-600 text-lg" />
      </button>
    </div>
  </div>)
};


export default QuestionView;
