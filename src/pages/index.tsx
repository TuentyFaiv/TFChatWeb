import { FC, FormEvent, useState } from "react";
import Head from "next/head";
import { useSocketContext } from "@context";

type Props = {};

const Home: FC<Props> = () => {
  const socket = useSocketContext();
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleInput = (event: any) => {
    setMessage(event.target?.value);
  }

  const handleSendMsg = (event: FormEvent) => {
    event.preventDefault();
    socket?.emit("message", message);
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
      <section>
        <h1>Chat Home</h1>
        <ul>
          {messages.map((message, index) => (
            <li key={`${message}-${index}`}>
              <p>{message}</p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSendMsg}>
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
        </form>
      </section>
    </>
  );
}

export default Home;