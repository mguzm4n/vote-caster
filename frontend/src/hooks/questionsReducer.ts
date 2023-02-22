import { Question } from "../components/CollectionCard";

export type Action = 
  | { type: "toggleForm" }
  | { type: "add", payload: { question: QuestionState } }
  | { type: "delete", payload: { id: string } }
  | { type: "expandAll", payload: { set: boolean } }
  | { type: "expand", payload: { question: QuestionState, set: boolean } }
 ;

export type QuestionState = Question & {
  expand: boolean,
}

type State = {
  questions: QuestionState[],
  createdNew: boolean,
  expandAll: boolean,
  expand: boolean,
}

export const initialState: State= {
  questions: [],
  createdNew: false,
  expandAll: false,
  expand: false,
}


export const questionsReducer = (state: State, action: Action): State => {
  switch (action.type) {
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
        questions: state.questions.filter(q => q._id != action.payload.id),
      }

    case "expandAll":
      return {
        ...state,
        questions: state.questions.map(q => ({ ...q, expand: action.payload.set })),
      }

    case "expand":
      const { question, set } = action.payload;
      const questions = [...state.questions];
      const idx = questions.map(q => q._id).indexOf(question._id);
      questions[idx] = { ...question, expand: set };

      return {
        ...state,
        questions: questions
      }
  
    default:
      return state;
  }
};