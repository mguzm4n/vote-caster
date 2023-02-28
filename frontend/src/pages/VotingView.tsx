import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { type ChangeEvent, useEffect, useState, FormEvent } from "react";
import { useParams } from "react-router-dom";
import AlternativesListInput from "../components/AlternativesListInput";
import { saveAnswers } from "../services/answerService";
import { getCollection } from "../services/collectionService";
import { AnswerRequest, buildAnswerRequest } from "../utils/forms";

const VotingView = () => {
  const [txtForm, setTxtForm] = useState({ username: '', email: ''});
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  
  const { collectionId } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getCollection("", collectionId!),
    queryKey: ["collections", collectionId],
  });

  const answerMutation = useMutation({
    mutationFn: (answers: AnswerRequest[]) => saveAnswers(collectionId!, answers, txtForm),
    onError: (error: AxiosError) => {
      setErrorMsg(error.response?.data as string);
    }
  })

  const handleTxtInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTxtForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const onRefreshCb = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    }
    window.addEventListener('beforeunload', onRefreshCb);
    return () => window.removeEventListener('beforeunload', onRefreshCb);
  }, []);

  if (isLoading) {
    return <div>Loading voting...</div>;
  }

  if (isError) {
    return <div>Network error. Try again!</div>;
  }
  
  const collection = data.data;

  if (!collection) {
    return <div>No existe esta colección.</div>
  }

  if (!collection.isPublished) {
    return <div>Colección no publicada.</div>
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const builtRequest = buildAnswerRequest(
      collectionId!,
      collection.questions,
      formData
    )
    if (!builtRequest) {
      return;
    }
    console.log(builtRequest);
    answerMutation.mutate(builtRequest);
  }

  return (
    <div className="px-12">
      <p>Votación '{collection.name}'</p>
      <div className="flex flex-col items-center">
        <label htmlFor="username" 
          className="bg-pink-500
           -mb-2 z-10 rounded-full text-white px-4 py-0.5 font-bold font-signika">
          Mi username identificador
        </label>
        <input className="peer border
          outline-none focus:ring-2 focus:ring-violet-700 
          bg-white rounded px-10 pb-2 py-3 text-center"
          type="text" placeholder="Mi usuario" name="username" id="username" 
          value={txtForm.username} onChange={handleTxtInput} required />
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="email" 
          className="bg-pink-500
           -mb-2 z-10 rounded-full text-white px-4 py-0.5 font-bold font-signika">
          Email para ser notificado
        </label>
        <input className="peer border
          outline-none focus:ring-2 focus:ring-violet-700 
          bg-white rounded px-10 pb-2 py-3 text-center"
          type="text" placeholder="Mi usuario" name="email" id="email" 
          value={txtForm.email} onChange={handleTxtInput} required />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {collection.questions.map((question, idx) => (<>
          <div key={question._id} className="">
            <div>
              <span className="text-2xl font-signika font-bold">{idx + 1}. </span>
              {question.name}
            </div>
            <AlternativesListInput
              multi={question.multipleChoice}
              questionId={question._id}
              alternatives={question.alternatives} />
          </div>
          <hr />
          </>))}
        <button className="transition-colors
          hover:text-white hover:bg-sky-500
          text-sky-500 border-2 bg-transparent border-sky-500 rounded text-sm font-bold py-2">
          Enviar respuestas
        </button>
      </form>
      {answerMutation.isError && 
      <div className="bg-pink-300 border border-rose-500 px-2 py-1 rounded">
        {errorMsg}
      </div>}
    </div>
  )
};

export default VotingView;
