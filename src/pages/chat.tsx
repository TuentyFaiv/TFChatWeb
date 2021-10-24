import { FC, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession, useSession } from "next-auth/client";
import { useSocketContext } from "@context";

import {
  ChatContainer,
  ChatContent,
  ChatContentHeader
} from "@stylesPages/Chat";

import Chats from "@components/Chats";
import Messages from "@components/Messages";
import FormMessage from "@components/FormMessage";
import ChatInfo from "@components/ChatInfo";

type Props = {};

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  };
};

const Chat: FC<Props> = () => {
  const [session, loading] = useSession();
  const { socket, chat, updateChat } = useSocketContext();
  const [infoActive, setInfoActive] = useState<boolean>(false);

  if (loading) {
    return null;
  }

  if (!session) {
    return (
      <>
        <Head>
          <title>Verhga | Not authenticated</title>
        </Head>
        <p>Please login</p>
      </>
    );
  }

  return (
    <ChatContainer info={infoActive}>
      <Head>
        <title>TuentyFaiv chat</title>
      </Head>
      <Chats
        socket={socket}
        updateChat={updateChat}
      />
      <ChatContent>
        <ChatContentHeader>
          <button
            type="button"
            onClick={() => setInfoActive(!infoActive)}
          >
            toggle info chat
          </button>
        </ChatContentHeader>
        <Messages
          messages={chat.messages}
          user={session?.user?.name}
          socket={socket}
        />
        <FormMessage
          user={session?.user?.name}
          socket={socket}
        />
      </ChatContent>
      {infoActive && (
        <ChatInfo />
      )}
    </ChatContainer>
  );
}

export default Chat;