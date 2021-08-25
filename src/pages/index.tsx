import { FC, FormEvent, useState } from "react";
import Head from "next/head";
import { useSocketContext, useUserContext } from "@context";

import { FormMessage, HomeContainer, Message, Messages } from "@stylesPages/Home";

type Props = {};

type MessagesType = {
  text: string;
  user: string;
}

const Home: FC<Props> = () => {
  const { state } = useUserContext();
  const socket = useSocketContext();
  const [messages, setMessages] = useState<MessagesType[]>([]);
  const [message, setMessage] = useState<string>("");
  const userValidation = /\d/g.test(state.user.name) ? `Anonymous${state.user.name}` : state.user.name;

  const handleInput = (event: any) => {
    setMessage(event.target?.value);
  }

  const handleSendMsg = (event: FormEvent) => {
    event.preventDefault();
    socket?.emit("message", {
      text: `${userValidation}: ${message}`,
      user: userValidation
    });
    setMessage("");
  };

  socket?.on("message", (msg: any) => {
    setMessages([...messages, msg])
  });

  return (
    <>
      <Head>
        <title>TuentyFaiv chat</title>
      </Head>
      <HomeContainer>
        <h1>Chat Home</h1>
        <Messages>
          {messages.map((message, index) => (
            <Message me={message.user === userValidation} key={`${message.user}-${index}`}>
              <p>{message.text}</p>
            </Message>
          ))}
        </Messages>
        <FormMessage onSubmit={handleSendMsg}>
          <label htmlFor="message">
            <p>Message:</p>
            <input
              type="text"
              name="message"
              id="message"
              placeholder="Type something..."
              onChange={handleInput}
              value={message}
              required
            />
          </label>
          <button type="submit">Send</button>
        </FormMessage>
      </HomeContainer>
    </>
  );
}

export default Home;