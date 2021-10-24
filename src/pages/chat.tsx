import { FC, FormEvent, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession, useSession } from "next-auth/client";
import { Grid, Gif } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { AiFillCloseCircle, AiOutlineFileGif, AiOutlineSend } from "react-icons/ai";
import { MdAttachFile } from "react-icons/md";
import { useSocketContext } from "@context";
import { GifSearchI, Messages as MessagesI } from "@interfaces";

import { Button, Input, Label } from "@styles/globals";
import {
  FormMessage,
  ChatContainer,
  Message,
  Messages,
  ChatContent,
  ChatInfo,
  Chats,
  GifsContainer,
  ChatButton,
  GifsHeader,
  GifsContent,
  GifsMessage
} from "@stylesPages/Chat";

type Props = {};

const APIKEY = process.env.NEXT_PUBLIC_APIKEY_GIPHY || "";
const gf = new GiphyFetch(APIKEY);

const fetchGifs = (offset: number) => gf.trending({ offset, limit: 10 });

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
  const [message, setMessage] = useState<string>("");
  const [gifs, setGifs] = useState<GifSearchI>({
    show: false,
    choose: null,
    search: ""
  });

  const handleInput = (event: any) => {
    setMessage(event.target?.value);
  };

  const handleShowGif = () => {
    setGifs({ ...gifs, show: !gifs.show });
  };

  const handleSearchGif = (event: any) => {
    setGifs({ ...gifs, search: event.target.value });
  };

  const handleChooseGif = (gif: any, event: any) => {
    event.preventDefault();
    console.log(gif);
    setGifs({ ...gifs, choose: gif, show: false });
  };

  const handleSendMsg = (event: FormEvent) => {
    event.preventDefault();
    socket?.emit("message", {
      text: message,
      user: session?.user?.name,
      content: gifs.choose,
      type: gifs.choose ? "giph" : "text"
    });
    setMessage("");
    setGifs({ ...gifs, show: false, choose: null, search: "" });
  };

  socket?.on("message", (msg: MessagesI) => {
    updateChat({ messages: [...chat.messages, msg] });
  });

  socket?.once("get messages", (msgs: MessagesI[]) => {
    updateChat({ type: "GROUP", messages: msgs });
  });

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
    <ChatContainer>
      <Head>
        <title>TuentyFaiv chat</title>
      </Head>
      <Chats>
        <p>Chats</p>
      </Chats>
      <ChatContent>
        <Messages>
          {chat?.messages?.map((message, index) => (
            <Message me={message.user === session?.user?.name} key={`${message.user}-${index}`}>
              {message.content && message.type === "giph" && (
                <Gif gif={message.content} width={200} />
              )}
              {message.text && (
                <p>{message.user === session?.user?.name ? message.text : `${message.user}: ${message.text}`}</p>
              )}
            </Message>
          ))}
        </Messages>
        <FormMessage onSubmit={handleSendMsg} relative>
          <Button type="button" icon>
            <MdAttachFile size={24} />
          </Button>
          <Label htmlFor="message" relative>
            <GifsMessage>
              {gifs.choose && (
                <Gif gif={gifs.choose} width={200} />
              )}
            </GifsMessage>
            <Input
              type="text"
              name="message"
              id="message"
              placeholder="Type something..."
              onChange={handleInput}
              value={message}
            />
            <ChatButton onClick={handleShowGif} type="button" icon>
              <AiOutlineFileGif size={22} />
            </ChatButton>
          </Label>
          {gifs.show && (
            <GifsContainer>
              <GifsHeader>
                <Label htmlFor="gifSearch" relative>
                  <Input
                    type="text"
                    name="gifSearch"
                    id="gifSearch"
                    placeholder="Search something..."
                    onChange={handleSearchGif}
                    value={gifs.search}
                    // required
                  />
                </Label>
                <ChatButton onClick={handleShowGif} type="button" icon normal>
                  <AiFillCloseCircle size={22} />
                </ChatButton>
              </GifsHeader>
              <GifsContent>
                <Grid width={800} columns={3} fetchGifs={fetchGifs} onGifClick={handleChooseGif}/>
              </GifsContent>
            </GifsContainer>
          )}
          <Button type="submit" icon>
            <AiOutlineSend size={24} />
          </Button>
        </FormMessage>
      </ChatContent>
      <ChatInfo>
        <p>Info</p>
      </ChatInfo>
    </ChatContainer>
  );
}

export default Chat;