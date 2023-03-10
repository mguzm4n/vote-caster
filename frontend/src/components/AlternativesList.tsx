import { useReducer } from "react";
import { alternativesReducer, initialState } from "../hooks/alternativesReducer";
import AlternativeForm from "./AlternativeForm";
import Alternative from "./Alternative";

interface AlternativesListProps {
  alternatives: string[];
  questionId: string;
}
const AlternativesList = ({ alternatives, questionId }: AlternativesListProps) => {
  const [state, dispatch] = useReducer(alternativesReducer, {
    alternatives: alternatives,
  })
  return (
    <div className="w-[90%] flex flex-col justify-center items-center gap-2 bg-white rounded-xl p-2">
      <AlternativeForm alternatives={state.alternatives} questionId={questionId} dispatch={dispatch} />
      {state.alternatives.map((a, idx) => {
        return <Alternative key={a} alternativeIndex={idx} questionId={questionId} dispatch={dispatch} alternative={a} />
      })}
    </div>
  )
};

export default AlternativesList;
