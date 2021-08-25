import { FC } from "react";

import Header from "@components/Header";

const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default Layout;