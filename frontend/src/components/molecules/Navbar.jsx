// Node module Imports
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import FAIcon from "@/components/atoms/FAIcon";
import { CircleButton } from "@/components/atoms/Button";
import useMediaQuery from "@/hooks/useMediaQuery";
import { setOverflowY } from "@/utils/cssUtils";

// prettier-ignore
const Section_sc = styled.section`
  width: 100vw;
  display: flex;
  gap: 10px;
  align-items: center;

  nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    background: var(--background-color);
    transition: 0.5s;

    span.brand {
      margin-left: 1rem;
      position: relative;
      cursor: pointer;
    }
  }

  ul {
    padding-inline: 15px;
    display: flex;
    align-items: center;
    gap: 20px;
    background: var(--theme-color);
    height: 65px;

    li {
      list-style-type: none;
      display: inline-block;
      font-size: 0.8rem;
      letter-spacing: 2px;
      cursor: pointer;
    }
  }

  div.toggle-button-container {
    z-index: 1 !important;

    button {
      display: none !important;
      margin-top: 8px;
      border: 1px solid var(--border-color);
      color: var(--color);
      pointer-events: all;
    }
  }

  div.fixed-container {
    width: 100vw;
    padding-left: 70px;
    display: none;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    top: 0;
    background: var(--background-color);
    border-bottom: 1px solid var(--border-color);
    pointer-events: all;
    overflow: hidden;

    ul.fixed-menus {
      gap: 15px;
      overflow: auto;
    }
  }

  @media screen and (max-width: ${({ $mutationBreakpoint }) => $mutationBreakpoint + "px"}) {
    align-items: start;
    transition: all 0.4s;
    pointer-events: none;
    z-index: 0;

    &.visible {
      background: var(--color-2d);
      backdrop-filter: blur(20px);
      pointer-events: all;

      nav {
        width: 220px;
        border-right: 1px solid var(--border-color);
      }

      div.fixed-container {
        display: none;
      }
    }

    nav {
      width: 0;
      height: 100vh !important;
      justify-content: start;
      gap: 2rem;
      padding-block: 1rem;
      border-bottom: 0;
      word-break: nowrap;
      text-wrap: nowrap;
      white-space: nowrap;
      overflow: hidden;
      z-index: 1;

      &,
      ul.collapsible-menus {
        flex-direction: column;
        height: unset;
        padding-block: 15px;
      }
    }

    div.fixed-container {
      display: flex;
    }

    div.toggle-button-container button {
      display: inline-block !important;
    }
  }
`;

function Navbar({
  brand,
  menus = {},
  mutationBreakpoint,
  screenBelowBreakpoint,
}) {
  const { smallerScreens = {}, largerScreens = [] } = menus;
  const { primaryMenus, secondaryMenus } = smallerScreens;

  const breakpointMatched = useMediaQuery(
    `(max-width: ${mutationBreakpoint}px)`,
  );

  const [navVisible, setNavVisible] = useState(false);

  const navRef = useRef(null);
  const navToggleBtnRef = useRef(null);

  const currentUser = useSelector((state) => state.security.currentUser);

  useEffect(() => {
    setOverflowY(screenBelowBreakpoint && navVisible);

    return () => setOverflowY(false);
  }, [navVisible, screenBelowBreakpoint]);

  const toggleNav = () => screenBelowBreakpoint && setNavVisible((p) => !p);

  return (
    <Section_sc
      className={navVisible ? "visible" : ""}
      onClick={(e) => {
        if (
          navRef.current &&
          !navRef.current.contains(e.target) &&
          navToggleBtnRef &&
          !navToggleBtnRef.current.contains(e.target)
        )
          setNavVisible(false);
      }}
      $loggedIn={currentUser}
      $mutationBreakpoint={mutationBreakpoint}
    >
      <nav ref={navRef}>
        <span className="brand" onClick={toggleNav}>
          {brand}
        </span>

        <ul className="collapsible-menus">
          {!breakpointMatched
            ? largerScreens.map((menu, index) => (
                <li key={index} onClick={toggleNav}>
                  {menu}
                </li>
              ))
            : primaryMenus.map((menu, index) => (
                <li key={index} onClick={toggleNav}>
                  {menu}
                </li>
              ))}
        </ul>
      </nav>

      <div ref={navToggleBtnRef} className="toggle-button-container">
        <CircleButton color="var(--background-color)" onClick={toggleNav}>
          <FAIcon icon="layer-group" />
        </CircleButton>
      </div>

      {secondaryMenus && (
        <div className="fixed-container">
          <ul className="secondary-scrollbar fixed-menus">
            {secondaryMenus.map((menu, index) => (
              <li key={index}>{menu}</li>
            ))}
          </ul>
        </div>
      )}
    </Section_sc>
  );
}

export default Navbar;
