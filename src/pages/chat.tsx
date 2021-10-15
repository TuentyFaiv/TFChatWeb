import { FC, FormEvent, useState } from "react";
import Head from "next/head";
import { Grid, Gif } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { AiFillCloseCircle, AiOutlineFileGif, AiOutlineSend } from "react-icons/ai";
import { MdAttachFile } from "react-icons/md";
import { useSocketContext, useUserContext } from "@context";
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

const Chat: FC<Props> = () => {
  const { state } = useUserContext();
  const socket = useSocketContext();
  const [messages, setMessages] = useState<MessagesI[]>([]);
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
      user: state.user.name,
      content: gifs.choose,
      type: gifs.choose ? "giph" : "text"
    });
    setMessage("");
    setGifs({ show: false, choose: null, search: "" });
  };

  socket?.on("message", (msg: any) => {
    setMessages([...messages, msg])
  });

  socket?.on("get messages", (msgs: any) => {
    setMessages(msgs);
  });

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
          {messages.map((message, index) => (
            <Message me={message.user === state.user.name} key={`${message.user}-${index}`}>
              {message.content && message.type === "giph" && (
                <Gif gif={message.content} width={200} />
              )}
              {message.text && (
                <p>{message.user === state.user.name ? message.text : `${message.user}: ${message.text}`}</p>
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