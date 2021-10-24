import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Gif } from "@giphy/react-components";
import { Messages as MessageInterface } from "@interfaces";

import {
  Message,
  Messages as MessagesContainer
} from "@stylesComponents/Messages";
import { Socket } from "socket.io-client";

type Props = {
  messages: MessageInterface[];
  user?: string;
  socket: Socket | null;
}

const Messages: FC<Props> = ({ messages, user, socket }) => {
  const [msgs, setMsgs] = useState<MessageInterface[]>(messages);
  const messagesRef = useRef<HTMLUListElement|null>(null);

  const scrollToLastMessage = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        left: 0,
        behavior: "smooth"
      });
    }
  }, [messagesRef]);

  socket?.on("message", (msg: MessageInterface) => {
    setMsgs([...msgs, msg]);
    scrollToLastMessage();
  });

  useEffect(() => {
    setMsgs(messages);
    scrollToLastMessage()
  }, [messages, scrollToLastMessage]);

  return (
    <MessagesContainer ref={messagesRef}>
      {msgs.map((message, index) => (
        <Message me={message.user === user} key={`${message.user}-${index}`}>
          {message.content && message.type === "giph" && (
            <Gif gif={message.content} width={200} />
          )}
          {message.text && (
            <p>{message.user === user ? message.text : `${message.user}: ${message.text}`}</p>
          )}
        </Message>
      ))}
    </MessagesContainer>
  );
}

export default Messages;