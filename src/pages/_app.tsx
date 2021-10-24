import type { AppProps } from "next/app"
import { Provider as AuthProvider } from "next-auth/client";
import { SocketContextProvider } from "@context";

import { GlobalStyles } from "@styles/globals";

import Layout from "@components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <AuthProvider session={pageProps.session}>
        <SocketContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SocketContextProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
