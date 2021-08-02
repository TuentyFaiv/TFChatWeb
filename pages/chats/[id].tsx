import { FC } from "react";
import Link from "next/link";
import Head from "next/head";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";

import { getAllPostIds, getPostData } from "@lib/posts";
import { Paths, AllPostData } from "@interfaces";

import DateFormat from "@components/Date";

type Props = {
  postData: AllPostData
}

const Chat: FC<Props> = ({ postData }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {postData.title}
      <br />
      {postData.id}
      <br />
      <DateFormat dateString={postData.date} />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      <Link href="/"><a>Back to home</a></Link>
    </>
  );
}

export default Chat;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  const allPath: { paths: Paths[], fallback: boolean } = {
    paths,
    fallback: false
  };

  return allPath;
}

export const getStaticProps = async ({ params }: Paths) => {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData
    }
  };
}