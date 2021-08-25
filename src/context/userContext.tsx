import { FC, createContext, useContext, useReducer, Dispatch } from "react";
import { reducer } from "./reducerUser";

type Props = {};

type ValueContext = [any, Dispatch<any>];

const UserContext = createContext <ValueContext|null> (null);

export const UserContextProvider: FC<Props> = ({ children }) => {
  const initialState = {
    user: {
      name: "",
      photo: ""
    }
  };

  return (
    <UserContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);