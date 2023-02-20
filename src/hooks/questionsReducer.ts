import { Question } from "../components/CollectionCard";

type Action = 
 | { type: "toggleForm" }
 | { type: "add", payload: { question: Question } }
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
        questions: [action.payload.question, ...state.questions]
      }
  
    default:
      return state;
  }
};