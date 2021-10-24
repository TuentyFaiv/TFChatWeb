import { FC } from "react";
import { signIn, signOut } from "next-auth/client";

import { Button, Text } from "@styles/globals";
import { HeaderContainer } from "@stylesComponents/Header";

import Sidebar from "@components/Sidebar";

type Props = {
  session: any,
  loading: boolean,
  auth: boolean
};

const Header: FC<Props> = ({ session, loading, auth }) => {
  if (loading) {
    return null;
  }

  return (
    <>
      <HeaderContainer>
        <Text>
          {session === null ? "Estas como usuario anonimo" : `Estas en el chat como ${session?.user?.name}`}
        </Text>
        <Button type="button" onClick={() => session === null ? signIn() : signOut()} small>
          {session === null ? "Signin" : "Signout"}
        </Button>
      </HeaderContainer>
      {auth && (
        <Sidebar />
      )}
    </>
  );
}

export default Header;