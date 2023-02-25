import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlternativesListInput from "../components/AlternativesListInput";
import { saveAnswers } from "../services/answerService";
import { getCollection } from "../services/collectionService";
import { AnswerRequest, buildAnswerRequest } from "../utils/forms";

const VotingView = () => {
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  
  const { collectionId } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getCollection("", collectionId!),
    queryKey: ["collections", collectionId],
  });

  const answerMutation = useMutation({
    mutationFn: (answers: AnswerRequest[]) => saveAnswers(collectionId!, answers, username),
    onError: (error: AxiosError) => {
      setErrorMsg(error.response?.data as string);
    }
  })

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
    <div>
      <p>Votación '{collection.name}'</p>
      <input className="bg-white rounded px-2 py-0.5"
        type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
      <form onSubmit={handleSubmit}>
        {collection.questions.map(question => (
          <div key={question._id}>
            {question.name}
            <AlternativesListInput
              multi={question.multipleChoice}
              questionId={question._id}
              alternatives={question.alternatives} />
          </div>
        ))}
        <button>Submit</button>
      </form>
      {answerMutation.isError && <div className="bg-pink-300 border border-rose-500 px-2 py-1 rounded">
        {errorMsg}
      </div>}
    </div>
  )
};

export default VotingView;
