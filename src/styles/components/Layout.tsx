import styled, { css } from 'styled-components';

interface LContainerI {
  auth?: boolean;
}

interface LContentI {
  noHeader?: boolean;
}

export const LayoutContainer = styled.div<LContainerI>`
  display: grid;
  grid-template-columns: 100px auto;
  grid-template-rows: 90px auto;
  grid-template-areas: "header header" "content content";
  ${({ auth }) => (auth && css`
    grid-template-areas: "sidebar header" "sidebar content";
  `)}
`;

export const LayoutContent = styled.main<LContentI>`
  grid-area: content;
  width: 100%;
  min-height: calc(100vh - 90px);
  ${({ noHeader }) => (noHeader && css`
    min-height: 100vh;
  `)}
`;