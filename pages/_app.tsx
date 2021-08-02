import type { AppProps } from 'next/app'
import { io } from "socket.io-client";

import { GlobalStyles } from "@styles/globals";

import Layout from "@components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const socket = io("", {
    path: "/realtime",
    transports: ["websocket", "polling"] // use WebSocket first, if available
  });//Argument = server with socket

  socket.on("connect_error", () => {
    // revert to classic upgrade
    socket.io.opts.transports = ["polling", "websocket"];
  });

  socket.on("connect", () => {
    console.log(socket.id);
    console.log(socket.connected);
  });
  
  socket.on("disconnect", () => {
    console.log(socket.id);
    console.log(socket.connected);
  });

  return (
    <Layout>
      <GlobalStyles />
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp
