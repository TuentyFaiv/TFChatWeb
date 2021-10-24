import { FC } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import { LayoutContainer, LayoutContent } from "@stylesComponents/Layout";

import Header from "@components/Header";

const Layout: FC = ({ children }) => {
  const [session, loading] = useSession();
  const { pathname } = useRouter();
  const noHeaderValidation = pathname === "/auth/signin";

  return (
    <LayoutContainer auth={session !== null}>
      <Header
        session={session}
        loading={loading}
        auth={session !== null}
      />
      <LayoutContent noHeader={noHeaderValidation}>
        {children}
      </LayoutContent>
    </LayoutContainer>
  );
};

export default Layout;
