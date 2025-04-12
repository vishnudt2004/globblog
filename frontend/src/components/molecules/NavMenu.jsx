// Node module Imports
import { Link } from "react-router-dom";
import styled from "styled-components";

const Div_sc = styled.div`
  position: relative;
  color: ${({ $color }) => $color};
  opacity: 0.6;
  word-break: keep-all;

  &:hover {
    opacity: 1;
  }

  &::after {
    content: "";
    width: 15%;
    height: 1px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: ${({ $color }) => $color};
    transition: width 0.4s;
  }

  &:hover::after {
    width: 100%;
  }
`;

function NavMenu({
  icon,
  children,
  link,
  color = "var(--nav-menus-color)",
  ...attr
}) {
  return (
    <Link to={link}>
      <Div_sc
        {...attr}
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          ...attr?.style,
        }}
        $color={color}
      >
        {children}
        {icon}
      </Div_sc>
    </Link>
  );
}

export default NavMenu;
