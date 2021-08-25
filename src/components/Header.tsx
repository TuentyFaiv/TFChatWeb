import { FC, FormEvent, useState } from "react";
import { useSocketContext, useUserContext } from "@context";

import { Modal, ModalContent, ModalInput, ModalButton, ModalActions, HeaderContainer } from "@styles/components/Header";

const Header: FC = () => {
  const { state, dispatch } = useUserContext();
  const socket = useSocketContext();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "" });

  const handleChangeName = (name: string = "") => {
    if (name === "") {
      const min = parseInt(socket!.id.replace(/\D/g, ""), 10) || 0;
      const userAnonymous = Math.floor(Math.random() * (100_000 - min) + min);
      dispatch({ type: "LOGIN", payload: { name: userAnonymous.toString() } });
    } else {
      dispatch({ type: "LOGIN", payload: { name } });
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
          <ModalContent onSubmit={handleSubmit}>
            <ModalInput
              type="text"
              name="name"
              id="name"
              placeholder="Ponte un nombre"
              value={form.name}
              onChange={handleInput}
              required
            />
            <ModalActions>
              <ModalButton type="button" cancel onClick={handleToogleModal}>Cancelar</ModalButton>
              <ModalButton type="submit">Escoger nombre</ModalButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
      {/\d/g.test(state.user.name) ? (
        <>
          <p>Estas como usuario anonimo</p>
          <button type="button" onClick={handleToogleModal}>Escoge un nombre</button>
        </>
      ) : (
        <>
          <p>Estas en el chat como{` ${state.user.name}`}</p>
          <button type="button" onClick={() => handleChangeName()}>Vuelvete anonimo</button>
        </>
      )}
    </HeaderContainer>
  );
}

export default Header;