import styled, { css } from "styled-components";

interface MessageI {
  me?: boolean;
}

export const Messages = styled.ul`
  display: block;
  width: 100%;
  height: calc(100vh - 180px);
  padding: 0 15px;
  list-style: none;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
    background-color: lightgray;
  }
  &::-webkit-scrollbar-thumb {
    width: 4px;
    background-color: lightblue;
  }
`;

export const Message = styled.li<MessageI>`
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