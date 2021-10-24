import styled, { createGlobalStyle, css } from "styled-components";

interface ButtonI {
  secondary?: boolean;
  icon?: boolean;
  small?: boolean;
}

interface InputI {
  margin?: boolean;
}

interface LabelI {
  relative?: boolean;
}

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html,
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const Label = styled.label<LabelI>`
  width: 100%;
  margin: 0 15px;
  ${({ relative }) => (relative && css`
    position: relative;
  `)}
`;

export const Text = styled.p`
  width: 100%;
  max-width: 300px;
  margin: 20px 0;
`;

export const Input = styled.input<InputI>`
  display: block;
  width: 100%;
  min-height: 40px;
  margin: 0 auto;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  ${({ margin }) => (margin && css`
    margin: 60px auto;
  `)}
`;

export const Button = styled.button<ButtonI>`
  margin: 20px 10px;
  padding: 15px 40px;
  border: 0;
  border-radius: 10px;
  ${({ secondary }) => (secondary && css`
    margin: 0 10px;
    border: 1px solid lightgray;
    background-color: transparent;
  `)}
  ${({ icon }) => (icon && css`
    width: 30px;
    height: 30px;
    padding: 3px;
    margin: 0;
    background-color: transparent;
  `)}
  ${({ small }) => (small && css`
    padding: 10px 30px;
  `)}
  &:hover {
    cursor: pointer;
  }
`;
