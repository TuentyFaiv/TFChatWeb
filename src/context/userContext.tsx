import { FC, createContext, useContext, useReducer, Dispatch } from "react";
import { Action, reducer } from "./reducerUser";

type Props = {};

export type InitialState = {
  user: {
    name: string;
    photo: string;
  };
}

type UserContextType = {
  state: InitialState; 
  dispatch: Dispatch<Action>;
};

const initialState = {
  user: {
    name: "",
    photo: ""
  }
};

const UserContext = createContext<UserContextType>({
  state: initialState,
  dispatch: () => null
});

export const UserContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);