import { useEffect, useRef } from "react";

const QuestionForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (nameRef && nameRef.current) {
      nameRef.current?.focus()
    }
  }, [nameRef]);
  
  return (
    <div>
      <form>
        <label htmlFor="name">Nombre</label>
        <input ref={nameRef} id="name" type="text" />
      </form>
    </div>
  )
};

export default QuestionForm;
