// Node module Imports
import styled, { css } from "styled-components";

import {
  // Utilities
  colorMix,
} from "../../config/exports";

const ButtonTag_sc = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0.5rem 1rem;
  background: ${({ $type, color }) =>
    $type === "primary" ? color : "transparent"};
  box-shadow: ${({ $type, color }) =>
    $type !== "primary" ? `inset 0 0 0 1px ${color}` : ""};
  color: ${({ $type, color }) => ($type !== "primary" ? color : "#000")};
  border-radius: ${({ $radius }) => $radius};
  font-size: 0.9rem;
  letter-spacing: 1;
  cursor: pointer;
  transition: all 0.4s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  & :first-child {
    order: ${({ $iconPosition }) => ($iconPosition === "left" ? 0 : 1)};
  }

  ${({ $style }) =>
    css`
      ${$style}
    `}

  &:hover {
    ${css`
      ${({ $hoverStyle }) =>
        Object.entries($hoverStyle).map(
          ([property, value]) => `${property}: ${value} !important;`
        )}
    `}
  }
`;

function Button({
  children,
  icon,
  type = "primary",
  radius,
  color = "var(--theme-color)",
  hoverStyle = type === "primary"
    ? { background: colorMix(color, "var(--color)", "15%") }
    : { background: color, color: "#000" },
  iconPosition = "left",
  type_attr = "button",
  ...attr
}) {
  return (
    <ButtonTag_sc
      {...attr}
      type={type_attr}
      $type={type}
      $radius={radius}
      color={color}
      $hoverStyle={hoverStyle}
      $iconPosition={iconPosition}
    >
      {icon && icon}
      {children}
    </ButtonTag_sc>
  );
}

function CircleButton({ children, size = "50px", style, ...attr }) {
  const circleStyle = {
    width: size,
    height: size,
    display: "grid",
    placeItems: "center",
    borderRadius: "50px",
    padding: 0,
  };

  return (
    <Button style={{ ...circleStyle, ...style }} {...attr}>
      {children}
    </Button>
  );
}

export default Button;
export { CircleButton };
