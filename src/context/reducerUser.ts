import { InitialState } from "./userContext";

export type Action = {
  type: "LOGIN",
  payload: {
    name: string;
    photo?: string;
  }
}

export const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    default:
      return {
        ...state
      };
  }
}