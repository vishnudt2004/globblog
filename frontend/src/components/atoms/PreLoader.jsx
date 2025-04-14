// Node module Imports
import styled from "styled-components";

import Center from "./Center";
import FAIcon from "./FAIcon";
import { cssUnitExtractor } from "@/utils/cssUtils";

const Div_sc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  letter-spacing: 2;
  padding: 10px;
  background: ${({ $background }) => $background};
  font-size: ${({ $size }) => {
    const { value, unit } = cssUnitExtractor($size);
    return `${value / 3}${unit}`;
  }};
  color: ${({ $color }) => $color};

  .inner {
    width: ${({ $size }) => $size};
    height: ${({ $size }) => $size};
    position: relative;
    border: ${({ $size, $color }) => {
      const { value, unit } = cssUnitExtractor($size);
      return `${value / 13}${unit} solid ${$color}`;
    }};
    border-radius: 50%;
    animation: pre-loader-keyframe 2s linear infinite;

    &::before,
    &::after {
      content: "";
      width: ${({ $size }) => {
        const { value, unit } = cssUnitExtractor($size);
        return `${value / 6}${unit}`;
      }};
      height: ${({ $size }) => {
        const { value, unit } = cssUnitExtractor($size);
        return `${value / 6}${unit}`;
      }};
      position: absolute;
      top: 0;
      left: 0;
      background: ${({ $background }) => $background};
    }

    &::after {
      top: unset;
      left: unset;
      bottom: 0;
      right: 0;
    }
  }

  @keyframes pre-loader-keyframe {
    to {
      transform: rotate(1turn);
    }
  }
`;

function PreLoader({
  size = "40px",
  background = "var(--background-color)",
  color = "var(--color)",
  text = "LOADING",
  ...attr
}) {
  return (
    <Div_sc $size={size} $background={background} $color={color} {...attr}>
      <div className="inner" />
      {text && text}
    </Div_sc>
  );
}

function PreLoaderMini({ size = "1.5rem" }) {
  return (
    <Center
      style={{
        height: "50px",
      }}
    >
      <FAIcon icon="circle-notch" mods="spin" style={{ fontSize: size }} />
    </Center>
  );
}

export default PreLoader;
export { PreLoaderMini };
