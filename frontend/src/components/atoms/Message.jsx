// Node module Imports
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";

// Configuration Imports
import config from "@/config/config";

import { BorderX } from "./Border";
import CSSTransition_mod, { CSSTEffect } from "./CSSTransition_mod";
import FAIcon from "./FAIcon";

const Div_sc = styled.div`
  --vertical-edges-gap: 5rem;
  --horizontal-edges-gap: 1rem;

  --box-border-width: 3px;
  --box-border-color: #0000004d;
  --box-border_indicator-radius: 5px;

  width: 400px;
  max-width: 90vw;
  height: fit-content;
  display: inline-flex;
  gap: 10px;
  justify-content: space-between;
  margin: auto;
  padding: 1rem;
  position: fixed;
  color: var(--message-text-color);
  border: var(--box-border-width) solid var(--box-border-color);
  border-radius: var(--box-border_indicator-radius);
  font-size: 0.9rem;
  overflow: hidden;
  z-index: ${({ $zIndex }) => $zIndex};

  &.secondary {
    width: fit-content;
    height: fit-content;
    padding: 5px 10px;
    border-radius: 0;
    font-size: 0.8rem;
    background: var(--background-color);
    border: 2px solid var(--box-border-color);
    color: var(--color);
  }

  &.top-left {
    top: var(--vertical-edges-gap);
    left: var(--horizontal-edges-gap);
  }

  &.top-center {
    top: var(--vertical-edges-gap);
    right: 0;
    left: 0;
  }

  &.top-right {
    top: var(--vertical-edges-gap);
    right: var(--horizontal-edges-gap);
  }

  &.middle-left {
    top: 0;
    bottom: 0;
    left: var(--horizontal-edges-gap);
  }

  &.middle-center,
  &.center {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &.middle-right {
    top: 0;
    right: var(--horizontal-edges-gap);
    bottom: 0;
  }

  &.bottom-left {
    bottom: var(--horizontal-edges-gap);
    left: var(--horizontal-edges-gap);
  }

  &.bottom-center {
    right: 0;
    bottom: var(--horizontal-edges-gap);
    left: 0;
  }

  &.bottom-right {
    right: var(--horizontal-edges-gap);
    bottom: var(--horizontal-edges-gap);
  }

  &.success {
    background: var(--success-color);
  }

  &.error {
    background: var(--error-color);
  }

  &.info {
    background: var(--info-color);
  }

  &.warning {
    background: var(--warning-color);
  }

  .time-indicator {
    position: absolute;
    bottom: 5px;
    left: 5px;
    right: 5px;
  }

  @media screen and (max-width: 768px) {
    --edges-gap: 1rem;
    --vertical-edges-gap: var(--edges-gap);
    --horizontal-edges-gap: var(--edges-gap);
  }

  @keyframes time-indicator-keyframe {
    to {
      width: 0;
    }
  }
`;

// PRIMARY NOTIFICATIONS
const Message = ({
  type, // success, error, warning, info
  children, // message
  options, // { duration, position }
  onExit, // () => { setVisible(false); ...other-logics }
  zIndex = "var(--message-zindex)",
}) => {
  const { DURATION, POSITION } = config.UI_ELEMENTS.MESSAGE;

  const duration = options?.duration || DURATION;
  const position = options?.position || POSITION;

  const [animate, setAnimate] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = {
      id: setTimeout(onExit, duration),
      start: Date.now(),
      remaining: duration,
    };
    return () => clearTimeout(timerRef.current.id);
  }, [duration, onExit]);

  const handleMouseOver = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current.id);
      setAnimate(false);
      timerRef.current.remaining -= Date.now() - timerRef.current.start;
    }
  };

  const handleMouseOut = () => {
    if (timerRef.current) {
      timerRef.current.start = Date.now();
      timerRef.current.id = setTimeout(onExit, timerRef.current.remaining);
      setAnimate(true);
    }
  };

  const icons = {
    success: "check-circle",
    error: "exclamation-circle",
    warning: "exclamation-triangle",
    info: "info-circle",
  };

  return createPortal(
    <Div_sc
      className={`primary ${position} ${type}`}
      $zIndex={zIndex}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <span>{children}</span>
      <span>
        <FAIcon mods="2x" icon={icons[type]} />
      </span>
      <span className="time-indicator">
        {children && (
          <BorderX
            key={children}
            color="var(--message-text-color)"
            width="100%"
            height="3px"
            radius="var(--box-border_indicator-radius)"
            style={{
              animation: `time-indicator-keyframe ${duration}ms linear forwards ${
                animate ? "running" : "paused"
              }`,
            }}
          />
        )}
      </span>
    </Div_sc>,
    document.body,
  );
};

// SECONDARY NOTIFICATIONS
function MessageMini({
  children,
  options,
  onExit,
  zIndex = "var(--message-zindex)",
}) {
  const { DURATION, POSITION } = config.UI_ELEMENTS.MESSAGEMINI;

  const duration = options?.duration || DURATION;
  const position = options?.position || POSITION;

  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(onExit, duration);
    return () => clearTimeout(timerRef.current);
  }, [duration, onExit]);

  return createPortal(
    <Div_sc className={`secondary ${position}`} $zIndex={zIndex}>
      {children}
    </Div_sc>,
    document.body,
  );
}

// to add transition effects
const MessageTEffect = ({ children, visible, ...props }) => {
  const messageTEffects = {
    className: "message",
    enter: css`
      opacity: 0;
      transform: scale(0.9);
    `,
    enterActive: css`
      opacity: 1;
      transform: translateX(0);
      transition:
        opacity 300ms,
        transform 300ms;
    `,
    exit: css`
      opacity: 1;
    `,
    exitActive: css`
      opacity: 0;
      transform: scale(0.9);
      transition:
        opacity 300ms,
        transform 300ms;
    `,
  };

  return (
    <>
      <CSSTEffect styles={messageTEffects} />

      <CSSTransition_mod
        className={messageTEffects.className}
        transitionProps={{
          in: visible,
          timeout: 100,
          unmountOnExit: true,
        }}
      >
        <Message {...props}>{children}</Message>
      </CSSTransition_mod>
    </>
  );
};

const MessageMiniTEffect = ({ children, visible, ...props }) => {
  const messageTEffects = {
    className: "messagemini",
    enter: css`
      opacity: 0;
      transform: translateY(20px);
    `,
    enterActive: css`
      opacity: 1;
      transform: translateY(0);
      transition:
        opacity 300ms,
        transform 300ms;
    `,
    exit: css`
      opacity: 1;
    `,
    exitActive: css`
      opacity: 0;
      transform: translateY(-20px);
      transition:
        opacity 300ms,
        transform 300ms;
    `,
  };

  return (
    <>
      <CSSTEffect styles={messageTEffects} />

      <CSSTransition_mod
        className={messageTEffects.className}
        transitionProps={{
          in: visible,
          timeout: 100,
          unmountOnExit: true,
        }}
      >
        <MessageMini {...props}>{children}</MessageMini>
      </CSSTransition_mod>
    </>
  );
};

export default MessageTEffect;
export { MessageMiniTEffect as MessageMini };
