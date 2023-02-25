interface AlternativeInputProps {
  isMulti: boolean, 
  alternative: string;
  questionId: string;
  idx: number;
};
const AlternativeInput = ({ isMulti, alternative, questionId, idx }: AlternativeInputProps) => {
  return (
    <>
      
      {isMulti
        ? <fieldset className="flex gap-2 items-center">
            <input className="" 
              name={`question-${questionId}`}
              id={`${questionId}-${idx}`} type="checkbox"
              value={alternative} />
            <label htmlFor={`${questionId}-${idx}`}>{ alternative }</label>
          </fieldset>
        : <fieldset className="flex gap-2 items-center">
            <input className="" 
              name={`question-${questionId}`}
              id={`${questionId}-${idx}`} type="radio"
              value={alternative} />
            <label htmlFor={`${questionId}-${idx}`}>{ alternative }</label>
          </fieldset>}
    </>
  )
};

export default AlternativeInput;
