import { CSSTransition } from "react-transition-group";
import { createGlobalStyle, css } from "styled-components";

const CSSTEffect_sc = createGlobalStyle`
  ${({ $classname, $enter, $enteractive, $exit, $exitactive }) => {
    return css`
      .${$classname}-enter {
        ${$enter}
      }

      .${$classname}-enter-active {
        ${$enteractive}
      }

      .${$classname}-exit {
        ${$exit}
      }

      .${$classname}-exit-active {
        ${$exitactive}
      }
    `;
  }}
`;

function CSSTransition_mod({ children, className, transitionProps }) {
  return (
    <CSSTransition {...transitionProps} classNames={className}>
      {children}
    </CSSTransition>
  );
}

function CSSTEffect({
  styles = {
    className: "",
    enter: "",
    enterActive: "",
    exit: "",
    exitActive: "",
  },
}) {
  // custom props, to avoid default-prop case error
  const transformedProps = Object.keys(styles).reduce((acc, key) => {
    acc[`$${key.toLowerCase()}`] = styles[key];
    return acc;
  }, {});

  return <CSSTEffect_sc {...transformedProps} />;
}

export default CSSTransition_mod;
export { CSSTEffect };
