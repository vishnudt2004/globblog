// Node module Imports
import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";

import {
  // Atoms
  FAIcon,
  CSSTransition_mod,
  CSSTEffect,

  // Utilities
  setOverflowY,
  colorMix,
} from "../../config/exports";

const Section_sc = styled.section`
  --modal-border-width: 3px;
  --modal-border_btn-color: var(--border-color);
  --close-btn-color: var(--color);
  --width: ${({ $width }) => $width};
  --max-width: 95vw;
  --max-height: ${({ $maxHeight }) => $maxHeight};
  --bg: ${({ $bg }) => $bg};
  --radius: ${({ $radius }) => $radius};

  width: 100vw;
  height: 100dvh;
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  backdrop-filter: blur(10px);
  transition: backdrop-filter 0.5s;
  z-index: var(--modal-zindex);
  background: var(--bg);

  .inner {
    width: var(--width);
    max-width: var(--max-width);
    min-height: 40px;
    height: fit-content;
    max-height: var(--max-height);
    display: grid;
    place-items: center;
    position: relative;
    background: var(--background-color);
    border: var(--modal-border-width) solid var(--modal-border_btn-color);
    border-radius: var(--radius);

    div.content {
      width: 100%;
      max-width: calc(var(--max-width) - (var(--modal-border-width) * 2));
      max-height: calc(var(--max-height) - (var(--modal-border-width) * 2));
      padding: var(--modal-border-width);
      overflow: auto;
    }

    i.close-btn {
      width: 35px;
      height: 35px;
      display: grid;
      place-items: center;
      position: absolute;
      top: 0;
      right: 0;
      background: var(--modal-border_btn-color);
      color: var(--close-btn-color);
      border-radius: 0 calc(var(--radius) * 0.6) 0 var(--radius);
      font-size: 1.2rem;
      cursor: pointer;
      transition: background 0.4s;
      z-index: 1;

      &:hover {
        background: ${() =>
          colorMix("var(--modal-border_btn-color)", "var(--color)", "20%")};
      }
    }
  }
`;

function Modal({
  width = "500px",
  maxHeight = "70vh",
  radius = "5px",
  bg = "var(--color-2d)",
  children, // content
  visible, // open the modal
  setVisible, // close the modal
  onClose, // logics while closing the modal
}) {
  useEffect(() => {
    setOverflowY(visible);

    return () => setOverflowY(false);
  }, [visible]);

  return createPortal(
    <Section_sc $width={width} $maxHeight={maxHeight} $radius={radius} $bg={bg}>
      <div className="inner">
        <FAIcon
          className="close-btn"
          icon="xmark"
          onClick={() => {
            if (setVisible) {
              setVisible(false);
            }
            if (onClose) onClose();
          }}
        />

        <div className="secondary-scrollbar content">{children}</div>
      </div>
    </Section_sc>,
    document.body
  );
}

// to add transition effects
const ModalTEffect = ({ children, visible, ...props }) => {
  const modalTEffects = {
    className: "modal",
    enter: css`
      .inner {
        opacity: 0;
        transform: scale(0.9);
      }
    `,
    enterActive: css`
      .inner {
        opacity: 1;
        transform: translateX(0);
        transition: opacity 300ms, transform 300ms;
      }
    `,
    exit: css`
      .inner {
        opacity: 1;
      }
    `,
    exitActive: css`
      .inner {
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 300ms, transform 300ms;
      }
    `,
  };

  return (
    <>
      <CSSTEffect styles={modalTEffects} />

      <CSSTransition_mod
        className={modalTEffects.className}
        transitionProps={{
          in: visible,
          timeout: 300,
          unmountOnExit: true,
        }}
      >
        <Modal visible={visible} {...props}>
          {children}
        </Modal>
      </CSSTransition_mod>
    </>
  );
};

export default ModalTEffect;
