import styled, { css } from 'styled-components';

interface IMessage {
  me?: boolean;
}

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

export const FormMessage = styled.form`
  display: flex;
  width: 100%;
  max-width: 900px;
  padding: 20px;
  align-items: center;
  justify-content: center;
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
  align-items: center;
  justify-content: flex-start;
  p {
    max-width: 500px;
    padding: 10px 20px;
    background-color: aliceblue;
    border-radius: 10px 10px 10px 0;
    margin: 0 0 20px;
  }
  ${({ me }) => (me && css`
    justify-content: flex-end;
    p {
      background-color: powderblue;
      border-radius: 10px 10px 0 10px;
    }
  `)}
`;