import { FC, createContext, useContext, useReducer } from "react";
import { UserContextI } from "@interfaces";
import { reducerUser } from "./reducerUser";

type Props = {};

const initialState = {
  user: {
    name: "",
    photo: ""
  }
};

const UserContext = createContext<UserContextI>({
  state: initialState,
  dispatch: () => null
});

export const UserContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducerUser, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);