import { useContext } from "react"
import { ToolActionsContext } from "./ToolActionsContext";

export const useToolActions = () => {
  const actions = useContext(ToolActionsContext);
  return actions;
}