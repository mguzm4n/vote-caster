import { useEffect, useRef, useState } from 'react';

const useTextarea = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [body, setBody] = useState("");

  useEffect(() => {
    if (textareaRef.current == null) return;
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = `${scrollHeight}px`;
  }, [body, textareaRef]);

  return { 
    body,
    setBody, 
    textareaRef 
  };
};

export default useTextarea;