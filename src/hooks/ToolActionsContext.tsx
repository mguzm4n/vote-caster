import { createContext, ReactNode, useState } from "react";

const initialOptionsState = {
  expandAll: false,
}

type ToolActionOptions = typeof initialOptionsState;

type ToolActionsCtx = {
  options: ToolActionOptions,
  setOptions: React.Dispatch<React.SetStateAction<ToolActionOptions>>
};

export const ToolActionsContext = createContext<ToolActionsCtx>({
  options: initialOptionsState,
  setOptions: () => console.log("Context Not Initialized")
});

const ToolActionsProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState(initialOptionsState);

  return (
    <ToolActionsContext.Provider value={{ options, setOptions }}>
     { children }
    </ToolActionsContext.Provider>
  )
}

export default ToolActionsProvider;