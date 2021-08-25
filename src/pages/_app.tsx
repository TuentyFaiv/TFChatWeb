import type { AppProps } from "next/app"
import { SocketContextProvider, UserContextProvider } from "@context";

import { GlobalStyles } from "@styles/globals";

import Layout from "@components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <GlobalStyles />
      <UserContextProvider>
        <SocketContextProvider>
          <Component {...pageProps} />
        </SocketContextProvider>
      </UserContextProvider>
    </Layout>
  );
}

export default MyApp;
