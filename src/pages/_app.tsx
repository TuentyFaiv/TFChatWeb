import type { AppProps } from "next/app"
import { SocketContextProvider, UserContextProvider } from "@context";

import { GlobalStyles } from "@styles/globals";

import Layout from "@components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <UserContextProvider>
        <SocketContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SocketContextProvider>
      </UserContextProvider>
    </>
  );
}

export default MyApp;
