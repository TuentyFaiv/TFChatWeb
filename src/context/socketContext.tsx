import { FC, createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Messages } from "@interfaces";

type Props = {};

interface Chat {
  type?: "PERSONAL" | "GROUP",
  messages: Messages[]
}

interface SocketConnectionApp {
  socket: Socket | null,
  chat: Chat,
  updateChat: (newChat: Chat) => void
}

const SocketContext = createContext<SocketConnectionApp>({
  socket: null,
  chat: {
    messages: []
  },
  updateChat: (newChat: Chat) => {}
});

export const SocketContextProvider: FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<Socket|null>(null);
  const [chat, setChat] = useState<Chat>({
    messages: []
  });

  const updateChat = (newChat: Chat) => {
    setChat({ ...chat, ...newChat });
  };

  useEffect(() => {
    const socketio = io(`${process.env.NEXT_PUBLIC_HOSTSOCKET}`, {
      transports: ["websocket", "polling"] // use WebSocket first, if available
    });

    socketio.on("connect", () => {
      console.log(socketio.id);
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
    <SocketContext.Provider value={{ socket, chat, updateChat }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);