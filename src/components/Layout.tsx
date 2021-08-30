import { FC } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "@context";

import { LayoutContainer, LayoutContent } from "@stylesComponents/Layout";

import Header from "@components/Header";
import Sidebar from "@components/Sidebar";

const Layout: FC = ({ children }) => {
  const { state } = useUserContext();
  const { pathname } = useRouter();
  const homeValidation = pathname !== "/";

  if (state.user.name === "" || /^Anonymous+./g.test(state.user.name)) {
    return (
      <LayoutContainer>
        {homeValidation && <Header />}
        <LayoutContent noHeader={!homeValidation}>{children}</LayoutContent>
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer auth>
      {homeValidation && <Header />}
      <Sidebar/>
      <LayoutContent noHeader={!homeValidation}>{children}</LayoutContent>
    </LayoutContainer>
  );
}

export default Layout;