import { useQuery } from "@tanstack/react-query";
import { FormEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import AlternativesListInput from "../components/AlternativesListInput";
import { getCollection } from "../services/collectionService";
import { buildAnswerRequest } from "../utils/forms";

const VotingView = () => {
  const { collectionId } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getCollection("", collectionId!),
    queryKey: ["collections", collectionId],
  });

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
    builtRequest && console.log(builtRequest);
  }

  return (
    <div>
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
    </div>
  )
};

export default VotingView;
