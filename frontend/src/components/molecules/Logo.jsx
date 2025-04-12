// Node module Imports
import styled from "styled-components";

import {
  // Atoms
  FAIcon,
} from "../../config/exports";

const Div_sc = styled.div`
  text-wrap: nowrap;
  word-wrap: nowrap;
  white-space: nowrap;

  .inner {
    position: relative;
    color: ${({ $color }) => $color.text};
    font-family: var(--font-family_light);
    font-weight: bold;
    letter-spacing: 2px;
    z-index: 0;
  }

  .inner::after {
    content: "";
    width: 15%;
    height: 1px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: ${({ $color }) => $color.text};
    transition: all 0.4s;
    z-index: -1;
  }

  .inner:hover::after {
    width: 100%;
  }

  .circle {
    width: 35px;
    height: 35px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-inline: 5px;
    background: ${({ $color }) => $color.circle};
    border-radius: 35px;
  }
`;

function LogoMini({
  color = { text: "var(--nav-brand-color)", circle: "var(--theme-color)" },
  ...attr
}) {
  return (
    <Div_sc {...attr} $color={color}>
      <span className="inner">
        GLOB
        <span className="circle">
          <FAIcon icon="newspaper" style={{ fontSize: "1rem" }} />
        </span>
        BLOG
      </span>
    </Div_sc>
  );
}

const Div_sc2 = styled.div`
  transform: scale(3) translateY(-25px);
  cursor: default;

  @media screen and (max-width: 480px) {
    transform: scale(2.3) translateY(-20px);
  }
`;

function Logo(attr) {
  return (
    <Div_sc2 {...attr}>
      <LogoMini />
    </Div_sc2>
  );
}

export default Logo;
export { LogoMini };
