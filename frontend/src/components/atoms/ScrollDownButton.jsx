// Node module Imports
import styled from "styled-components";

const Div_sc = styled.div`
  width: 60px;
  height: 60px;
  position: relative;
  background: var(--theme-color);
  border-radius: 150px;
  outline-width: 3px;
  outline-style: solid;
  outline-color: color;
  outline-offset: 20px;
  z-index: ${({ $zIndex }) => $zIndex};
  cursor: pointer;
  transform: scale(0.8);
  transition: all 0.4s;

  div {
    position: absolute;
    transition: all 0.4s;
    border: ${({ $color }) => `3px solid ${$color}`};
    border-radius: 10px;
  }

  div._1 {
    right: 20px;
    bottom: 0;
    background: ${({ $color }) => $color};
    transform: ${({ $reverseScroll }) =>
      $reverseScroll ? "translate(60%, -451%) rotate(45deg)" : "rotate(45deg)"};
    transition-delay: 0.1s;
  }

  div._2 {
    width: 10px;
    height: 80%;
    margin: auto;
    top: ${({ $reverseScroll }) => ($reverseScroll ? "10px" : 0)};
    right: 0;
    bottom: ${({ $reverseScroll }) => ($reverseScroll ? 0 : "10px")};
    left: 0;
    background: ${({ $color }) =>
      `linear-gradient(45deg, transparent 50%, ${$color} 50%)`};
  }

  div._3 {
    bottom: 0;
    left: 20px;
    transform: ${({ $reverseScroll }) =>
      $reverseScroll
        ? "translate(-60%, -451%) rotate(135deg)"
        : "rotate(135deg)"};
  }

  div:not(._2) {
    width: 70%;
    height: 10px;
  }

  &:hover {
    div:not(._2) {
      width: 80% !important;
    }

    div._2 {
      height: 70% !important;
    }
  }

  &:active {
    div:not(._2) {
      width: 70% !important;
    }

    div._2 {
      height: 80% !important;
    }
  }

  @media screen and (max-width: 768px) {
    transform: scale(0.7);
  }
`;

const Div_sc2 = styled.div`
  position: fixed;
  bottom: 70px;
  right: 70px;
  z-index: var(--scroll_down_button-zindex);

  @media screen and (max-width: 768px) {
    right: 30px;
    bottom: 30px;
  }
`;

function ScrollDownButton({
  reverseScroll,
  color = "var(--color)",
  zIndex = "var(--scroll_down_button-zindex)",
  ...attr
}) {
  return (
    <Div_sc2>
      <Div_sc
        {...attr}
        $color={color}
        $zIndex={zIndex}
        $reverseScroll={reverseScroll}
      >
        <div className="_1" />
        <div className="_2" />
        <div className="_3" />
      </Div_sc>
    </Div_sc2>
  );
}

export default ScrollDownButton;
