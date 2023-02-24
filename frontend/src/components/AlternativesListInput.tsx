import AlternativeInput from "./AlternativeInput";

const AlternativesListInput = ({ alternatives, questionId, multi }: { alternatives: string[], questionId: string, multi: boolean }) => {
  return (
    <div>
      {alternatives.map((alternative, idx) => (
        <AlternativeInput isMulti={true}
          key={`question-${questionId}-idx-${idx}`}
          questionId={questionId} idx={idx} alternative={alternative} />
      ))}
    </div>
  )
};

export default AlternativesListInput;
