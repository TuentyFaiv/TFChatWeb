import type { AppProps } from "next/app"

import { GlobalStyles } from "@styles/globals";

import Layout from "@components/Layout";
import { SocketContextProvider } from "@context/socketContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <GlobalStyles />
      <SocketContextProvider>
        <Component {...pageProps} />
      </SocketContextProvider>
    </Layout>
  );
}

export default MyApp;
