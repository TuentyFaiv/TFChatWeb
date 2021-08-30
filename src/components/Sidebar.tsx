import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineMenu, AiOutlineMessage } from "react-icons/ai";
import { MdQueueMusic } from "react-icons/md";

import { SidebarContainer, SidebarItem, SidebarLink, SidebarList, SidebarMenu } from "@stylesComponents/Sidebar";

const Sidebar: FC = () => {
  const { pathname } = useRouter();
  return (
    <SidebarContainer>
      <SidebarMenu>
        <AiOutlineMenu size={28} />
      </SidebarMenu>
      <SidebarList>
        <SidebarItem>
          <Link href="/music" passHref>
            <SidebarLink active={pathname === "/music"}>
              <MdQueueMusic size={28} />
            </SidebarLink>
          </Link>
        </SidebarItem>
        <SidebarItem>
          <Link href="/chat" passHref>
            <SidebarLink active={pathname === "/chat"}>
              <AiOutlineMessage size={28} />
            </SidebarLink>
          </Link>
        </SidebarItem>
      </SidebarList>
    </SidebarContainer>
  );
}

export default Sidebar;