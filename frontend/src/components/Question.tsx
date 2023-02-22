import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AiFillDelete, AiOutlineExpandAlt, AiOutlineShrink } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { type QuestionState, type Action } from "../hooks/questionsReducer";
import { deleteQuestion } from "../services/questionService";
import QuestionForm from "./QuestionForm";

interface QuestionViewProps {
  question: QuestionState;
  dispatch: React.Dispatch<Action>;
}

const QuestionView = ({ question, dispatch }: QuestionViewProps) => {
  const { collectionId } = useParams();
  const deleteMutation = useMutation({
    mutationFn: () => deleteQuestion(question._id, collectionId!),
    onSuccess: () => {
      dispatch({ type: "delete", payload: { id: question._id } })
    },
  })

  const handleDelete = () => {
    const confirmed = confirm("Estás eliminando definitivamente una opción en la colección. ¿Estás seguro?");
    confirmed && deleteMutation.mutate();
  }

  const handleExpand = () => {
    dispatch({ type: "expand", payload: { question, set: !question.expand } });
  }

  return (
  <div className="flex flex-col gap-1">
    <div className="flex flex-row gap-2">
      <div className="w-[80%]">
        <h3 className="w-full text-ellipsis bg-white rounded px-2 py-2 focus:outline-none focus:outline-2 focus:outline-indigo-600">
          {question.name}
        </h3>
      </div>
      <div className="w-[20%] flex justify-center gap-1.5">
        <button
          onClick={handleExpand}
          title="Ver pregunta completa"
          className="disabled:animate-pulse w-full flex justify-center items-center px-2 bg-sky-200 rounded">
          {question.expand 
           ? <AiOutlineShrink className="fill-sky-500 text-lg" />
           : <AiOutlineExpandAlt className=" fill-sky-500 text-lg" />
          }
        </button>
        <button
          onClick={handleDelete}
          disabled={deleteMutation.isLoading}
          title="Eliminar esta pregunta"
          className="disabled:animate-pulse w-full flex justify-center items-center px-2 bg-rose-200 rounded">
          <AiFillDelete className="fill-rose-600 text-lg" />
        </button>
      </div>
    </div>
    {question.expand && <QuestionForm question={question} />}
  </div>)
};


export default QuestionView;
