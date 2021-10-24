import { FC } from "react";
import Head from "next/head";
// import { useRouter } from "next/router";
// import { UserActionTypes } from "@interfaces";

// import { Button, Input, Label, Text } from "@styles/globals";
import { MusicContainer, MusicContent } from "@stylesPages/Music";

type Props = {};

const Music: FC<Props> = () => {
//   const { dispatch } = useUserContext();
  // const socket = useSocketContext();
  // const { push } = useRouter();

  return (
    <MusicContainer>
      <Head>
        <title>Music</title>
      </Head>
      <MusicContent>
        <h1>Music</h1>
      </MusicContent>
    </MusicContainer>
  );
}

export default Music;