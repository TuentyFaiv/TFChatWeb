import { FC, FormEvent, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { getSortedPostsData } from "@lib/posts";
import { PostData } from "@interfaces";
import { useSocketContext } from "@context/socketContext";

import DateFormat from "@components/Date";

type Props = {
  allPostsData: PostData[]
};

const Home: FC<Props> = ({ allPostsData = [] }) => {
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
        <h1>Blog</h1>
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
        <ul>
          {
            allPostsData.map(({ id, date, title }) => (
              <li key={id}>
                {title}
                <br />
                <Link href={`/chats/${id}`}><a>{id}</a></Link>
                <br />
                <DateFormat dateString={date} />
              </li>
            ))
          }
        </ul>
      </section>
    </>
  )
}

export default Home;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData
    }
  }
}
