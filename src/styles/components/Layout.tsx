import styled, { css } from 'styled-components';

interface LContainerI {
  auth?: boolean;
}

interface LContentI {
  noHeader?: boolean;
}

export const LayoutContainer = styled.div<LContainerI>`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 60px auto;
  grid-template-areas: "header header" "content content";
  ${({ auth }) => (auth && css`
    grid-template-areas: "sidebar header" "sidebar content";
  `)}
`;

export const LayoutContent = styled.main<LContentI>`
  grid-area: content;
  width: 100%;
  height: calc(100vh - 60px);
  ${({ noHeader }) => (noHeader && css`
    height: 100vh;
  `)}
`;
