import { Dispatch } from "react";

export interface Messages {
  text: string;
  user: string;
}

export enum UserStatus {
  Connected,
  Disconnected,
  Away,
  DontDisturb,
}

export interface UserInitialState {
  user: {
    name: string;
    photo: string;
  }
}

export enum UserActionTypes {
  SIGNIN,
  SIGNOUT
}

export interface UserSignin {
  type: UserActionTypes.SIGNIN,
  payload: {
    name: string;
    photo?: string;
  }
}
export interface UserSignout {
  type: UserActionTypes.SIGNOUT
}

export type UserActions = UserSignin | UserSignout;

export interface UserContextI {
  state: UserInitialState,
  dispatch: Dispatch<UserActions>
}

export interface PostData {
  id: string;
  title: string;
  date: string;
}

export interface AllPostData {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
}

export interface Paths {
  params: {
    id: string;
  }
}