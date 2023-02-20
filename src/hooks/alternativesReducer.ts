import { AiTwotoneAlert } from "react-icons/ai";
import { Question } from "../components/CollectionCard";

export type Action = 
  | { type: "add", alternative: string }
  | { type: "delete", alternativeIndex: number }
 ;


type State = {
  alternatives: string[],
};

export const initialState: State= {
  alternatives: [],
}


export const alternativesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "add":
      if (state.alternatives.includes(action.alternative)) {
        return state;
      }
      
      return {
        ...state,
        alternatives: [...state.alternatives, action.alternative]
      }

    case "delete":
      return {
        ...state,
        alternatives: state.alternatives.filter((a, idx) => idx !== action.alternativeIndex),
      }
  
    default:
      return state;
  }
};