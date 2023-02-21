import { useEffect, useState } from "react";
import { TbArrowRightTail } from 'react-icons/tb';
import { Action } from "../hooks/questionsReducer";

const QuestionToolButtons = ({ dispatch }: { dispatch : React.Dispatch<Action> }) => {
  const [options, setOptions] = useState({
    expandAll: false,
  });

  const handleExpandAll = () => {
    setOptions(prev => 
      ({ ...prev, expandAll: !prev.expandAll })
    );
  };

  useEffect(() => {
    dispatch({ 
      type: "expandAll", 
      payload: { set: options.expandAll } 
    });
  }, [options.expandAll]);

  return (
    <div className="group max-w-min flex items-center gap-2">
      <TbArrowRightTail className="group-hover:animate-bounce-x text-xl ml-2" />
      <button 
        className="min-w-max transition-[background-color] duration-200 bg-pink-500 rounded font-bold text-sm px-2 py-0.5 text-white shadow hover:text-pink-600 hover:bg-white"
        onClick={handleExpandAll}>
        {options.expandAll
          ? "Ocultar preguntas"
          : "Expandir preguntas"
        }
      </button>
    </div>
  )
};

export default QuestionToolButtons;
