import styled, { css } from 'styled-components';

interface ChatContainerI {
  info?: boolean;
}

export const ChatContainer = styled.div<ChatContainerI>`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas: "chats messages messages";
  ${({ info }) => (info && css`
    grid-template-areas: "chats messages info";
  `)}
`;

export const ChatContent = styled.section`
  grid-area: messages;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 5px;
  border-left: 2px solid lightgray;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

export const ChatContentHeader = styled.header`
  width: 100%;
  height: 40px;
`;
