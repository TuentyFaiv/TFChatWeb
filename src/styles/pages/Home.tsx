import styled, { css } from 'styled-components';

interface IMessage {
  me?: boolean;
}

export const HomeContainer = styled.section`
  display: flex;
  width: 100%;
  max-width: 1700px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const FormMessage = styled.form`
  display: flex;
  width: 100%;
  max-width: 800px;
  align-items: flex-end;
  label {
    display: block;
    width: 100%;
  }
  input {
    width: 90%;
  }
  button {
    min-height: 40px;
  }
`;

export const Messages = styled.ul`
  width: 100%;
  max-width: 800px;
  margin: 30px auto;
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