import { FC } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {}

const Server: FC<Props> = () => {

  return (
    <>
      <Head>
        <title>Servers</title>
      </Head>
      Servers
      <Link href="/"><a>Back to home</a></Link>
    </>
  );
}

export default Server;