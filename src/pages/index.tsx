import { FC, FormEvent, useState } from "react";
import Head from "next/head";
import { useSocketContext, useUserContext } from "@context";
import { Messages } from "@interfaces";

import { FormMessage, HomeContainer, Message, Messages as CMessages } from "@stylesPages/Home";

type Props = {};

const Home: FC<Props> = () => {
  const { state } = useUserContext();
  const socket = useSocketContext();
  const [messages, setMessages] = useState<Messages[]>([]);
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
    <HomeContainer>
      <Head>
        <title>TuentyFaiv chat</title>
      </Head>
      <h1>Chat Home</h1>
      <CMessages>
        {messages.map((message, index) => (
          <Message me={message.user === state.user.name} key={`${message.user}-${index}`}>
            <p>{`${message.user}: ${message.text}`}</p>
          </Message>
        ))}
      </CMessages>
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
  );
}

export default Home;