import { FC, FormEvent, useState } from "react";
import Head from "next/head";
import { useSocketContext, useUserContext } from "@context";
import { Messages as MessagesI } from "@interfaces";
import { AiOutlineSend } from "react-icons/ai";
import { MdAttachFile } from "react-icons/md";

import { Button, Input, Label } from "@styles/globals";
import { FormMessage, ChatContainer, Message, Messages, ChatContent, ChatInfo, Chats } from "@stylesPages/Chat";

type Props = {};

const Chat: FC<Props> = () => {
  const { state } = useUserContext();
  const socket = useSocketContext();
  const [messages, setMessages] = useState<MessagesI[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleInput = (event: any) => {
    setMessage(event.target?.value);
  }

  const handleSendMsg = (event: FormEvent) => {
    event.preventDefault();
    socket?.emit("message", {
      text: message,
      user: state.user.name
    });
    setMessage("");
  };

  socket?.on("message", (msg: any) => {
    setMessages([...messages, msg])
  });

  return (
    <ChatContainer>
      <Head>
        <title>TuentyFaiv chat</title>
      </Head>
      <Chats>
        <p>Chats</p>
      </Chats>
      <ChatContent>
        <Messages>
          {messages.map((message, index) => (
            <Message me={message.user === state.user.name} key={`${message.user}-${index}`}>
              <p>{`${message.user}: ${message.text}`}</p>
            </Message>
          ))}
        </Messages>
        <FormMessage onSubmit={handleSendMsg}>
          <Button type="button" icon>
            <MdAttachFile size={24} />
          </Button>
          <Label htmlFor="message">
            <Input
              type="text"
              name="message"
              id="message"
              placeholder="Type something..."
              onChange={handleInput}
              value={message}
              required
            />
          </Label>
          <Button type="submit" icon>
            <AiOutlineSend size={24} />
          </Button>
        </FormMessage>
      </ChatContent>
      <ChatInfo>
        <p>Info</p>
      </ChatInfo>
    </ChatContainer>
  );
}

export default Chat;