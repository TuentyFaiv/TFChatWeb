import { FC, memo, FormEvent, useState } from "react";
import { Grid, Gif } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { AiFillCloseCircle, AiOutlineFileGif, AiOutlineSend } from "react-icons/ai";
import { MdAttachFile } from "react-icons/md";
import { GifSearchI } from "@interfaces";
import { Socket } from "socket.io-client";

import { Button, Input, Label } from "@styles/globals";
import {
  FormMessage as FormMessageContainer,
  GifsContainer,
  FormMessageButton,
  GifsHeader,
  GifsContent,
  GifsMessage
} from "@stylesComponents/FormMessage";

type Props = {
  user?: string | null;
  socket: Socket | null;
};

const APIKEY = process.env.NEXT_PUBLIC_APIKEY_GIPHY || "";
const gf = new GiphyFetch(APIKEY);
const fetchGifs = (offset: number) => gf.trending({ offset, limit: 10 });

const FormMessage: FC<Props> = ({ socket, user }) => {
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
      text: message.trim(),
      user,
      content: gifs.choose,
      type: gifs.choose ? "giph" : "text"
    });
    setMessage("");
    setGifs({ show: false, choose: null, search: "" });
  };

  return (
    <FormMessageContainer onSubmit={handleSendMsg} relative>
      <Button type="button" icon>
        <MdAttachFile size={24} />
      </Button>
      <Label htmlFor="message" relative>
        {gifs.choose && (
          <GifsMessage>
            <Gif gif={gifs.choose} width={200} />
          </GifsMessage>
        )}
        <Input
          type="text"
          name="message"
          id="message"
          placeholder="Type something..."
          onChange={handleInput}
          value={message}
        />
        <FormMessageButton onClick={handleShowGif} type="button" icon>
          <AiOutlineFileGif size={22} />
        </FormMessageButton>
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
              />
            </Label>
            <FormMessageButton onClick={handleShowGif} type="button" icon normal>
              <AiFillCloseCircle size={22} />
            </FormMessageButton>
          </GifsHeader>
          <GifsContent>
            <Grid
              width={800}
              columns={3}
              fetchGifs={fetchGifs}
              onGifClick={handleChooseGif}
            />
          </GifsContent>
        </GifsContainer>
      )}
      <Button type="submit" icon>
        <AiOutlineSend size={24} />
      </Button>
    </FormMessageContainer>
  );
}

export default memo(FormMessage);