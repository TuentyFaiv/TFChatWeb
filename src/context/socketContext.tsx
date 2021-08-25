import { FC, createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type Props = {};

const SocketContext = createContext<Socket|null>(null);

export const SocketContextProvider: FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<Socket|null>(null)

  useEffect(() => {
    const socketio = io(`ws://${process.env.NEXT_PUBLIC_HOSTSOCKET}/`, {
      transports: ["websocket", "polling"] // use WebSocket first, if available
    });

    socketio.once("connect", () => {
      console.log(socketio.id);
      console.log(socketio.connected);
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