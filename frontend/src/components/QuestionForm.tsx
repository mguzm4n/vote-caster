import { useMutation } from "@tanstack/react-query";
import { type FormEvent, useEffect, type Dispatch } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionState } from "../hooks/questionsReducer";
import useTextarea from "../hooks/usetextArea";
import { updateQuestion } from "../services/questionService";
import AlternativesList from "./AlternativesList";
import SwitchInput from "./SwitchInput";

interface QuestionFormProps {
  question: QuestionState;
  setTitle: Dispatch<React.SetStateAction<string>>
}

const QuestionForm = ({ question, setTitle }: QuestionFormProps) => {
  const { collectionId } = useParams();

  const {
    body: questionTitle, 
    setBody: setQuestionTitle, 
    textareaRef 
  } = useTextarea();

  const questionUpdate = useMutation({
    mutationFn: (form: FormData) => updateQuestion(question._id, collectionId!, form),
    onSuccess: (data, form) => {
        setTitle(form.get('name') as string)
      }
  })

  const onSubmitQuestionForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    questionUpdate.mutate(new FormData(e.currentTarget));
  }

  useEffect(() => setQuestionTitle(question.name), []);

  return (<div className="bg-gray-200 rounded p-2 pb-4 mb-4 flex flex-col items-center gap-4">
    <form onSubmit={onSubmitQuestionForm} className="flex flex-col items-center gap-4 w-[90%]">
      <fieldset className="w-full">
        <label htmlFor="name" className="text-sm">Nombre de la opción/pregunta</label>
        <textarea className="bg-white rounded p-2 block w-full"
          id="name" name="name"
          ref={textareaRef} onChange={e => setQuestionTitle(e.currentTarget.value)}
          value={questionTitle} />
      </fieldset>
      <fieldset className="flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="flex gap-2 items-center justify-between">
          <label tabIndex={0} className="focus:underline focus:underline-offset-2 text-sm" htmlFor="multiChoice">Permitir alternativa múltiple</label>
          {/* <input id="multiChoice" type="checkbox" defaultChecked={question.multipleChoice} /> */}
          <SwitchInput defaultValue={question.multipleChoice} nameId="multiChoice"/>
        </div>
        <div className="flex gap-2 items-center justify-between">  
          <label tabIndex={0} className="focus:underline focus:underline-offset-2 text-sm" htmlFor="editable">Permitir edición</label>
          {/* <input id="editable" type="checkbox" defaultChecked={question.multipleChoice} /> */}
          <SwitchInput defaultValue={question.editable} nameId="editable"/>
        </div>
      </fieldset>

      <button className="border-2 border-sky-500 hover:bg-white hover:text-sky-500 w-1/2 py-1.5 bg-sky-500 text-sm font-semibold text-white rounded-full">
        Guardar!
      </button>
    </form>
    <AlternativesList questionId={question._id} alternatives={question.alternatives} />
  </div>)
};

export default QuestionForm;
