// Node module Imports
import styled from "styled-components";

import { cssUnitExtractor } from "@/utils/cssUtils";

const Div_sc = styled.div`
  width: ${({ $size }) => {
    const { value, unit } = cssUnitExtractor($size);
    return `${value * 2}${unit}`;
  }};
  height: ${({ $size }) => $size};
  position: relative;
  background: ${({ $colors }) => $colors.bg};
  border-radius: ${({ $radius }) => $radius};
  border: ${({ $colors }) => `3px solid ${$colors.bg}`};
  cursor: pointer;
  box-sizing: content-box;

  .inner {
    width: ${({ $size }) => $size};
    height: ${({ $size }) => $size};
    display: grid;
    place-items: center;
    position: absolute;
    top: 0;
    left: ${({ $on }) => ($on ? "50%" : 0)};
    background: ${({ $colors, $on }) => ($on ? $colors.on : $colors.off)};
    border-radius: ${({ $radius }) => $radius};
    transition: ${({ $transition }) => $transition};
  }
`;

function ToggleButton({
  on = false,
  radius = "15px",
  colors = { bg: "#fff", off: "#aaa", on: "#000" },
  size = "18px",
  transition = "all 0.4s",
  icon,
  ...attr
}) {
  return (
    <Div_sc
      {...attr}
      $on={on}
      $radius={radius}
      $colors={colors}
      $size={size}
      $transition={transition}
    >
      <div className="inner">{icon ? (on ? icon?.on : icon?.off) : null}</div>
    </Div_sc>
  );
}

export default ToggleButton;
