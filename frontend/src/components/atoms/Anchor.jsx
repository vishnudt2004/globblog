// Node module Imports
import styled from "styled-components";

import FAIcon from "./FAIcon";

const Div_sc = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  a {
    color: ${({ color }) => color};
    text-decoration: underline;
    text-underline-offset: 5px;
    cursor: pointer;

    & + i {
      opacity: 0;
      transform: translateX(-10px);
      transition: all 0.4s;
    }

    &:hover + i {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

function Anchor({
  children,
  color = "royalblue",
  icon = <FAIcon icon="arrow-right" style={{ rotate: "-45deg" }} />,
  style,
  ...attr
}) {
  return (
    <Div_sc style={style}>
      <a color={color} target="_blank" {...attr}>
        {children}
      </a>{" "}
      {icon && icon}
    </Div_sc>
  );
}

export default Anchor;
