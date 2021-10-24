import styled, { css } from "styled-components";

interface MessageI {
  me?: boolean;
}

export const Messages = styled.ul`
  display: block;
  width: 100%;
  max-width: 900px;
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
  margin: 0 0 10px;
  p {
    max-width: 500px;
    padding: 10px;
    background-color: #EDF6E5;
    border-radius: 10px 10px 10px 0;
  }
  span {
    font-size: 1.2rem;
    color: rgba(100, 100, 100, .5);
  }
  ${({ me }) => (me && css`
    align-items: flex-end;
    p {
      background-color: #542E71;
      color: #FFFFFF;
      border-radius: 10px 10px 0 10px;
    }
  `)}
`;