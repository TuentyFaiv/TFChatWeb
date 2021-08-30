import { UserActionTypes, UserInitialState } from "@interfaces";

export const reducerUser = (state: UserInitialState, action: any) => {
  switch (action.type) {
    case UserActionTypes.SIGNIN:
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