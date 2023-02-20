import { Question } from "../components/CollectionCard";

export type Action = 
  | { type: "toggleForm" }
  | { type: "add", payload: { question: Question } }
  | { type: "delete", payload: { id: string } }
 ;


type State = {
  questions: Question[],
  toggleForm: boolean,
  createdNew: boolean,
};

export const initialState: State= {
  questions: [],
  toggleForm: false,
  createdNew: false,
}


export const questionsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "toggleForm":
      return {
        ...state,
        toggleForm: !state.toggleForm,
      };

    case "add":
      return {
        ...state,
        createdNew: true,
        questions: [...state.questions, action.payload.question]
      }

    case "delete":
      return {
        ...state,
        createdNew: false,
        questions: state.questions.filter(q => q._id !== action.payload.id),
      }
  
    default:
      return state;
  }
};