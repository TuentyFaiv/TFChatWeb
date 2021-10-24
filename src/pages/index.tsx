import { FC } from "react";
import Head from "next/head";

import { HomeContainer, HomeContent } from "@stylesPages/Home";

type Props = {};

const Home: FC<Props> = () => {
  return (
    <HomeContainer>
      <Head>
        <title>Home</title>
      </Head>
      <HomeContent>
        You are in home
      </HomeContent>
    </HomeContainer>
  );
};

export default Home;
