// Node module Imports
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useDetectScroll from "@smakss/react-scroll-direction";

import Button from "@/components/atoms/Button";
import FAIcon from "@/components/atoms/FAIcon";
import { LogoMini } from "@/components/molecules/Logo";
import Navbar from "@/components/molecules/Navbar";
import NavMenu from "@/components/molecules/NavMenu";
import { UserCardMini } from "@/components/molecules/UserCard";
import ToggleMode from "@/components/molecules/ToggleMode";
import LogoutAction_enhancer from "@/components/molecules/actions/LogoutAction";
import { getCssVarValue, cssUnitExtractor } from "@/utils/cssUtils";

// prettier-ignore
const Section_sc = styled.section`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: calc(-65px - 1px); /* height + border */
  left: 0;
  transition: top 0.4s;
  z-index: var(--header-zindex);

  &.visible {
    top: 0;
  }

  @media screen and (max-width: ${({ $mutationBreakpoint }) => `${$mutationBreakpoint}px`}) {
    top: 0;
    pointer-events: none;
  }
`;

function Header() {
  const { pathname } = useLocation();
  const { scrollDir } = useDetectScroll();

  const [headerVisible, setHeaderVisible] = useState(true);

  const currentUser = useSelector((state) => state.security.currentUser);

  const mutationBreakpoint = cssUnitExtractor(
    getCssVarValue("--navbar-mutation-breakpoint"),
  )?.value;
  const screenBelowBreakpoint = window.innerWidth <= mutationBreakpoint;

  useEffect(() => {
    if (!screenBelowBreakpoint)
      if (scrollDir === "down") setHeaderVisible(false);
      else if (scrollDir === "up") setHeaderVisible(true);
  }, [scrollDir, screenBelowBreakpoint]);

  const NavMenu_with_LogoutAction = LogoutAction_enhancer(NavMenu);

  const menusList = {
    home: pathname !== "/" && (
      <NavMenu icon={<FAIcon icon="home" />} link="/">
        HOME
      </NavMenu>
    ),
    currentUserCard: currentUser && (
      <UserCardMini
        image={currentUser.profile?.image}
        userId={currentUser._id}
        style={{
          fontSize: "0.8rem",
          fontFamily: "var(--font-family_light)",
          textWrap: "wrap",
          flexDirection: "row-reverse",
          color: "var(--nav-menus-color)",
        }}
      />
    ),
    write: currentUser && (
      <NavMenu icon={<FAIcon icon="feather-pointed" />} link="/write">
        WRITE
      </NavMenu>
    ),
    search: !pathname.startsWith("/search") && currentUser && (
      <Button
        as={Link}
        to="/search"
        color="var(--background-color)"
        icon={<FAIcon icon="search" />}
        radius="50px"
        style={{
          color: "var(--color)",
          wordBreak: "keep-all",
          fontFamily: "var(--font-family_light)",
        }}
      >
        Search
      </Button>
    ),
    register: !currentUser && (
      <NavMenu icon={<FAIcon icon="user-plus" />} link="/register">
        REGISTER
      </NavMenu>
    ),
    login: !currentUser && (
      <NavMenu icon={<FAIcon icon="user-circle" />} link="/login">
        LOGIN
      </NavMenu>
    ),
    logout: currentUser && (
      <NavMenu_with_LogoutAction icon={<FAIcon icon="door-open" />}>
        LOGOUT
      </NavMenu_with_LogoutAction>
    ),
    modeButton: <ToggleMode />,
  };
  const {
    home,
    modeButton,
    write,
    logout,
    currentUserCard,
    login,
    register,
    search,
  } = menusList;

  const brand = (
    <Link to="/">
      <LogoMini />
    </Link>
  );
  const menus = {
    smallerScreens: {
      primaryMenus: [home, write, logout, login, register].filter(Boolean),
      secondaryMenus: [search, modeButton, currentUserCard].filter(Boolean),
    },

    largerScreens: [
      search,
      home,
      write,
      logout,
      login,
      register,
      modeButton,
      currentUserCard,
    ].filter(Boolean),
  };

  return (
    <Section_sc
      className={headerVisible ? "visible" : ""}
      $mutationBreakpoint={mutationBreakpoint}
    >
      <Navbar
        brand={brand}
        menus={menus}
        mutationBreakpoint={mutationBreakpoint}
        screenBelowBreakpoint={screenBelowBreakpoint}
      />
    </Section_sc>
  );
}

export default Header;
