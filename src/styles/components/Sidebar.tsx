import styled, { css } from 'styled-components';

interface SLinkI {
  active: boolean;
}

export const SidebarContainer = styled.aside`
  grid-area: sidebar;
  width: 80px;
  height: 100%;
`;

export const SidebarMenu = styled.div`
  display: flex;
  height: 60px;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

export const SidebarList = styled.ul`
  display: flex;
  height: calc(100vh - 60px);
  margin: auto 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  list-style: none;
`;

export const SidebarItem = styled.li`
  margin: 10px auto;
`;

export const SidebarLink = styled.a<SLinkI>`
  display: block;
  padding: 10px;
  ${({ active }) => (active && css`
    border-radius: 10px;
    background-color: thistle;
  `)}
`;