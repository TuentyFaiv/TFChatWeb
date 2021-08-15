import { FC, createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type Props = {};

const SocketContext = createContext<Socket|null>(null);

export const SocketContextProvider: FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<Socket|null>(null)

  useEffect(() => {
    const socketio = io("ws://localhost:4000/", {
      transports: ["websocket", "polling"] // use WebSocket first, if available
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