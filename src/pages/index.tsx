import { FC, FormEvent, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useUserContext } from "@context";
import { UserActionTypes } from "@interfaces";

import { Button, Input, Label, Text } from "@styles/globals";
import { HomeContainer, HomeContent, HomeForm } from "@stylesPages/Home";

type Props = {};

const Home: FC<Props> = () => {
  const { dispatch } = useUserContext();
  // const socket = useSocketContext(); // Login
  const { push } = useRouter();
  const [form, setForm] = useState({ name: "" });

  const handleChageInput = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      dispatch({ type: UserActionTypes.SIGNIN, payload: { name: form.name } });
      setForm({ name: "" });
      push("/chat");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HomeContainer>
      <Head>
        <title>Home</title>
      </Head>
      <HomeContent>
        <HomeForm onSubmit={handleSubmit}>
          <Label htmlFor="name">
            <Text>Escoge un nombre</Text>
            <Input type="text" id="name" name="name" onChange={handleChageInput} value={form.name} required placeholder="username" />
          </Label>
          <Button type="submit">
            Iniciar session
          </Button>
        </HomeForm>
        <Button onClick={() => push("/chat")} type="button" secondary>
          Continuar como anonimo
        </Button>
      </HomeContent>
    </HomeContainer>
  );
}

export default Home;