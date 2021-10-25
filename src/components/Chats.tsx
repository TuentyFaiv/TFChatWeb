import { FC } from "react";
import { Socket } from "socket.io-client";
import { Chat, Messages } from "@interfaces";

import {
  Chats as ChatsContainer,
} from "@stylesComponents/Chats";

type Props = {
  // eslint-disable-next-line no-unused-vars
  updateChat: (newChat: Chat) => void;
  socket: Socket | null;
};

const Chats: FC<Props> = ({ socket, updateChat }) => {

  socket?.once("get messages", (msgs: Messages[]) => {
    updateChat({ type: "GROUP", messages: msgs });
  });

  return (
    <ChatsContainer>
      <p>Here goes chats</p>
    </ChatsContainer>
  );
}

export default Chats;