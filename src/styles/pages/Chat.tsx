import styled, { css } from 'styled-components';
import { Button } from '@styles/globals';

interface IMessage {
  me?: boolean;
}

interface FormMessageI {
  relative?: boolean;
}

interface ChatButtonI {
  normal?: boolean;
}

export const ChatButton = styled(Button)<ChatButtonI>`
  position: absolute;
  right: 10px;
  top: 6px;
  ${({ icon }) => (icon && css`
    width: 28px;
    height: 28px;
  `)}
  ${({ normal }) => (normal && css`
    position: initial;
  `)}
`;

export const ChatContainer = styled.div`
  display: grid;
  width: 100%;
  min-height: calc(100vh - 90px);
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas: "chats messages info";
`;

export const Chats = styled.section`
  grid-area: chats;
  width: 100%;
  min-height: calc(100vh - 90px);
  padding: 20px;
`;

export const ChatContent = styled.section`
  grid-area: messages;
  display: flex;
  width: 100%;
  min-height: calc(100vh - 90px);
  padding: 0 20px;
  border-left: 2px solid lightgray;
  border-right: 2px solid lightgray;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

export const ChatInfo = styled.section`
  grid-area: info;
  width: 100%;
  min-height: calc(100vh - 90px);
  padding: 20px;
`;

export const GifsContainer = styled.section`
  position: absolute;
  display: flex;
  width: 100%;
  height: 90vh;
  background-color: rgba(255, 255, 255, .5);
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  left: 50%;
  bottom: 80px;
  transform: translateX(-50%);
`;

export const GifsHeader = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin: 20px 0;
  align-items: center;
  justify-content: space-between;
`;

export const GifsContent = styled.div`
  width: max-content;
  max-width: 100%;
  height: 90vh;
  margin: 0 auto;
  overflow-x: auto;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: lightgray;
  }
  &::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: lightblue;
  }
`;

export const GifsMessage = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: -20px;
  transform: translateY(-100%);
`;

export const FormMessage = styled.form<FormMessageI>`
  display: flex;
  width: 100%;
  max-width: 900px;
  padding: 20px;
  align-items: center;
  justify-content: center;
  ${({ relative }) => (relative && css`
    position: relative;
  `)}
`;

export const Messages = styled.ul`
  width: 100%;
  max-width: 900px;
  min-height: calc(100vh - 170px);
  margin: 0 auto;
  padding: 0;
  list-style: none;
`;

export const Message = styled.li<IMessage>`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  p {
    max-width: 500px;
    padding: 10px 20px;
    background-color: aliceblue;
    border-radius: 10px 10px 10px 0;
    margin: 0 0 20px;
  }
  ${({ me }) => (me && css`
    align-items: flex-end;
    p {
      background-color: powderblue;
      border-radius: 10px 10px 0 10px;
    }
  `)}
`;