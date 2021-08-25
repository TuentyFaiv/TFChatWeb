import styled, { css } from 'styled-components';

interface IButton {
  cancel?: boolean;
}

export const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  padding: 35px 16px;
  align-items: center;
  justify-content: center;
  p {
    margin: 0 20px;
  }
`;

export const Modal = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  background-color: rgba(0, 0, 0, .4);
  align-items: center;
  justify-content: center;
  inset: 0;
  z-index: 10;
`;

export const ModalContent = styled.form`
  display: flex;
  width: 100%;
  max-width: 65%;
  min-height: 250px;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ModalInput = styled.input`
  display: block;
  margin: 60px auto;
  min-height: 40px;
`;

export const ModalButton = styled.button<IButton>`
  margin: 0 10px;
  padding: 15px 40px;
  border: 0;
  border-radius: 10px;
  ${({ cancel }) => (cancel && css`
    border: 1px solid lightgray;
    background-color: transparent;
  `)}
  &:hover {
    cursor: pointer;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

`;
