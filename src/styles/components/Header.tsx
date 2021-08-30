import styled from 'styled-components';

export const HeaderContainer = styled.header`
  grid-area: header;
  display: flex;
  width: 100%;
  padding: 16px;
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

export const ModalContent = styled.div`
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

export const ModalForm = styled.form`
  display: flex;
  width: 100%;
  max-width: 900px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ModalActions = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

`;
