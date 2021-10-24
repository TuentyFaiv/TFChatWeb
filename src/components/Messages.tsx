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
  const messagesScrollRef = useRef<HTMLUListElement|null>(null); 

  const scrollToLastMessage = useCallback(() => {
    if (messagesScrollRef.current) {
      messagesScrollRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [messagesScrollRef]);

  socket?.on("message", (msg: MessageInterface) => {
    setMsgs([...msgs, msg]);
    scrollToLastMessage();
  });

  useEffect(() => {
    setMsgs(messages);
  }, [messages]);

  useEffect(() => {
    if (msgs.length > 0) {
      scrollToLastMessage();
    }
  }, [msgs, scrollToLastMessage]);

  return (
    <MessagesContainer>
      {msgs.map((message, index) => (
        <Message me={message.user === user} key={`${message.user}-${index}`}>
          {message.user !== user && (
            <span>{message.user}</span>
          )}
          {message.content && message.type === "giph" && (
            <Gif gif={message.content} width={200} />
          )}
          {message.text && (
            <p>{message.text}</p>
          )}
        </Message>
      ))}
      <span ref={messagesScrollRef} />
    </MessagesContainer>
  );
}

export default Messages;