import { RefObject, useEffect, useState } from "react";
interface SwitchInputProps {
  nameId: string,
}
const SwitchInput = ({ nameId }: SwitchInputProps) => {
  const [isOn, setIsOn] = useState(false);
  
  const transitionAmount = isOn ? "translateX(100%)" : "translateX(0%)";
  return (<>
    <input id={nameId} name={nameId} checked={isOn} className="hidden" type="checkbox" 
      onChange={e => setIsOn(e.target.checked)} />
    <div tabIndex={0} onClick={() => setIsOn(prev => !prev)} className="focus:outline-none focus:ring-2 focus:inset-2 focus:ring-violet-500 w-10 bg-gray-300 rounded-full cursor-pointer p-1">
      <div style={{ transform: transitionAmount }}
        className={`${isOn ? "bg-sky-400" : "bg-white"} shadow transition-all h-4 w-4 rounded-full`}>
      </div>
    </div>
  </>)
};

export default SwitchInput;
