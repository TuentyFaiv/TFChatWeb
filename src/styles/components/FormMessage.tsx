import styled, { css } from 'styled-components';
import { Button } from '@styles/globals';

interface FormMessageI {
  relative?: boolean;
}

interface ChatButtonI {
  normal?: boolean;
}

export const FormMessage = styled.form<FormMessageI>`
  display: flex;
  width: 100%;
  max-width: 900px;
  padding: 20px 15px;
  align-items: center;
  justify-content: center;
  ${({ relative }) => (relative && css`
    position: relative;
  `)}
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

export const FormMessageButton = styled(Button) <ChatButtonI>`
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