import { FC } from "react";
import { getSortedPostsData } from "@lib/posts";
import { PostData } from "@interfaces";

import Link from "next/link";
import DateFormat from "@components/Date";

type Props = {
  allPostsData: PostData[]
};

const Home: FC<Props> = ({ allPostsData = [] }) => {
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
