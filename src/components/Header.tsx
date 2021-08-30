import { FC, FormEvent, useState } from "react";
import { UserActionTypes } from "@interfaces";
import { useSocketContext, useUserContext } from "@context";

import { Button, Input, Label, Text } from "@styles/globals";
import { Modal, ModalContent, ModalActions, HeaderContainer, ModalForm } from "@stylesComponents/Header";

const Header: FC = () => {
  const { state, dispatch } = useUserContext();
  const socket = useSocketContext();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "" });

  const handleChangeName = (name: string = "") => {
    if (name === "") {
      const min = parseInt(socket!.id.replace(/\D/g, ""), 10) || 0;
      const userAnonymous = Math.floor(Math.random() * (100_000 - min) + min);
      const userName = `Anonymous${userAnonymous.toString()}`;
      dispatch({ type: UserActionTypes.SIGNIN, payload: { name: userName } });
    } else {
      dispatch({ type: UserActionTypes.SIGNIN, payload: { name } });
    }
  }

  const handleToogleModal = () => {
    setModal(!modal);
    setForm({ name: "" });
  };

  const handleInput = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleChangeName(form.name);
    handleToogleModal();
  };

  return (
    <HeaderContainer>
      {modal && (
        <Modal>
          <ModalContent>
            <ModalForm onSubmit={handleSubmit}>
              <Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Ponte un nombre"
                  value={form.name}
                  onChange={handleInput}
                  required
                />
              </Label>
              <ModalActions>
                <Button type="button" secondary onClick={handleToogleModal}>Cancelar</Button>
                <Button type="submit">Escoger nombre</Button>
              </ModalActions>
            </ModalForm>
          </ModalContent>
        </Modal>
      )}
      {/\d/g.test(state.user.name) ? (
        <>
          <Text>Estas como usuario anonimo</Text>
          <Button type="button" onClick={handleToogleModal} small>Escoge un nombre</Button>
        </>
      ) : (
        <>
          <Text>Estas en el chat como{` ${state.user.name}`}</Text>
          <Button type="button" onClick={() => handleChangeName()} small secondary>Vuelvete anonimo</Button>
        </>
      )}
    </HeaderContainer>
  );
}

export default Header;