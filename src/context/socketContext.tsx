import { FC, createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { UserActionTypes } from "@interfaces";
import { useUserContext } from "./userContext";

type Props = {};

const SocketContext = createContext<Socket|null>(null);

export const SocketContextProvider: FC<Props> = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const { dispatch } = useUserContext();
  const [socket, setSocket] = useState<Socket|null>(null);

  useEffect(() => {
    const socketio = io(`${process.env.NEXT_PUBLIC_HOSTSOCKET}`, {
      transports: ["websocket", "polling"] // use WebSocket first, if available
    });

    socketio.on("connect", () => {
      console.log(socketio.id);
      const min = parseInt(socketio.id.replace(/\D/g, ""), 10) || 0;
      const userAnonymous = Math.floor(Math.random() * (100_000 - min) + min);
      const userName = `Anonymous${userAnonymous.toString()}`;
      dispatch({ type: UserActionTypes.SIGNIN, payload: { name: userName } });
    });

    socketio.on("disconnect", () => {
      console.log(socketio.id);
      console.log(socketio.connected);
    });

    socketio.on("connected user", (args: any) => {
      console.log(args);
    });

    setSocket(socketio);
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);