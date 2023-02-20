import { type ReactNode } from "react";

interface UnderlinedTitleProps {
  OutlineIcon: ReactNode,
  FillIcon: ReactNode,
  Text: ReactNode
} 

const UnderlinedTitle = ({ OutlineIcon, FillIcon, Text}: UnderlinedTitleProps) => {
  return (
    <div className="group flex flex-col">
      <div className="flex gap-2 items-center">
        <div className="self-start mt-1">
          <div className="hidden group-hover:block">
            {OutlineIcon}
          </div>
          <div className="block group-hover:hidden">
            {FillIcon}
          </div>
        </div>
        <h3 className="text-2xl">{Text}</h3>
      </div>
      <div className="transition-[width] group-hover:w-full hover:w-full w-[70%] h-2 bg-pink-500 rounded-tr rounded-br">
      </div>
    </div>
  )
};

export default UnderlinedTitle;
