import { FC } from "react";
import Link from "next/link";
import { getSortedPostsData } from "@lib/posts";
import { PostData } from "@interfaces";
import { useSocketContext } from "@context/socketContext";

import DateFormat from "@components/Date";

type Props = {
  allPostsData: PostData[]
};

const Home: FC<Props> = ({ allPostsData = [] }) => {
  const socket = useSocketContext();
  console.log(socket);
  // socket.on("connect_error", () => {
  //   // revert to classic upgrade
  //   socket.io.opts.transports = ["polling", "websocket"];
  // });

  socket?.once("connect", () => {
    console.log(socket?.id);
    console.log(socket?.connected);
  });

  socket?.on("disconnect", () => {
    console.log(socket?.id);
    console.log(socket?.connected);
  });

  socket?.on("connected user", (args: any) => {
    console.log(args);
  });

  return (
    <>
      <section>
        <h1>Blog</h1>
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
