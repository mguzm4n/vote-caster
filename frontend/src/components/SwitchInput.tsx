import { RefObject, useEffect, useState } from "react";
interface SwitchInputProps {
  nameId: string,
  defaultValue: boolean,
}
const SwitchInput = ({ nameId, defaultValue }: SwitchInputProps) => {
  const [isOn, setIsOn] = useState(defaultValue);
  
  const transitionAmount = isOn ? "translateX(100%)" : "translateX(0%)";
  return (<>
    <input id={nameId} name={nameId} checked={isOn} className="hidden" type="checkbox" 
      onChange={e => setIsOn(e.target.checked)} />
    <div tabIndex={0} onClick={() => setIsOn(prev => !prev)} 
      className={`${isOn ? "bg-sky-400" : "bg-gray-300"} box-content focus:outline-none focus:ring-2 focus:inset-2 focus:ring-violet-500 
       p-0.5 w-8 h-4 rounded-full cursor-pointer flex justify-start items-center`}>
      <div style={{ transform: transitionAmount }}
        className={`bg-white shadow transition-all h-4 w-4 rounded-full`}>
      </div>
    </div>
  </>)
};

export default SwitchInput;
