import styled, { css } from "styled-components";

interface MessageI {
  me?: boolean;
  nextIsMy?: boolean;
  prevIsMy?: boolean;
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
  margin: ${({ nextIsMy }) => (
    nextIsMy 
      ? "0 0 2px"
      : "0 0 10px"
  )};
  p {
    max-width: 500px;
    padding: 10px;
    background-color: #EDF6E5;
    ${({ nextIsMy, prevIsMy }) => ((!nextIsMy && prevIsMy) && css`
      position: relative;
      border-radius: 3px 10px 10px 0;
      &::after {
        position: absolute;
        content: "";
        border-color: #EDF6E5;
        border-width: 8px;
        border-top-width: 5px;
        border-bottom-width: 5px;
        border-style: solid;
        border-radius: 3px;
        border-right-color: transparent;
        border-bottom-color: transparent;
        left: 0;
        bottom: -6px;
      }
    `)}
    ${({ nextIsMy, prevIsMy }) => ((!nextIsMy && !prevIsMy) && css`
      position: relative;
      border-radius: 10px 10px 10px 0;
      &::after {
        position: absolute;
        content: "";
        border-color: #EDF6E5;
        border-width: 8px;
        border-top-width: 5px;
        border-bottom-width: 5px;
        border-style: solid;
        border-radius: 3px;
        border-right-color: transparent;
        border-bottom-color: transparent;
        left: 0;
        bottom: -6px;
      }
    `)}
    ${({ nextIsMy, prevIsMy }) => (
      (nextIsMy && !prevIsMy)
        && css`border-radius: 10px 10px 10px 3px;`
    )}
    ${({ nextIsMy, prevIsMy }) => (
      (nextIsMy && prevIsMy)
        && css`border-radius: 3px 10px 10px 3px;`
    )}
  }
  span {
    font-size: 1.2rem;
    color: rgba(100, 100, 100, .5);
  }
  ${({ prevIsMy }) => (prevIsMy && css`
    span {
      display: none;
    }
  `)}
  ${({ me, nextIsMy, prevIsMy }) => (me && css`
    align-items: flex-end;
    p {
      background-color: #542E71;
      color: #FFFFFF;
      ${(!nextIsMy && prevIsMy) && css`
        position: relative;
        border-radius: 10px 3px 0px 10px;
        &::after {
          position: absolute;
          content: "";
          border-color: #542E71;
          border-width: 8px;
          border-top-width: 5px;
          border-bottom-width: 5px;
          border-style: solid;
          border-radius: 3px;
          border-left-color: transparent;
          border-bottom-color: transparent;
          right: 0;
          bottom: -6px;
        }
      `}
      ${(!nextIsMy && !prevIsMy) && css`
        position: relative;
        border-radius: 10px 10px 0px 10px;
        &::after {
          position: absolute;
          content: "";
          border-color: #542E71;
          border-width: 8px;
          border-top-width: 5px;
          border-bottom-width: 5px;
          border-style: solid;
          border-radius: 3px;
          border-left-color: transparent;
          border-bottom-color: transparent;
          right: 0;
          bottom: -6px;
        }
      `}
      ${(nextIsMy && !prevIsMy) && css`
        border-radius: 10px 10px 3px 10px;
      `}
      ${(nextIsMy && prevIsMy) && css`
        border-radius: 10px 3px 3px 10px;
      `}
    }
  `)}
`;