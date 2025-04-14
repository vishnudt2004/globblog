// Node module Imports
import { Link } from "react-router-dom";
import styled from "styled-components";

import { BorderX } from "@/components/atoms/Border";
import Button from "@/components/atoms/Button";
import FAIcon from "@/components/atoms/FAIcon";

const Div_sc = styled.div`
  width: fit-content;

  &,
  a {
    display: flex;
    align-items: end;
    color: var(--color2);
  }

  flex-direction: column;
  gap: ${({ $button }) => ($button ? "2.5px" : 0)};
  font-size: 0.8rem;

  a {
    gap: 10px;
  }

  &.disabled {
    cursor: not-allowed;

    a {
      opacity: 0.5;
      pointer-events: none;
    }
  }
`;

function PageRedirectLink({ children, redirect, button, disabled, ...attr }) {
  return (
    <Div_sc
      {...attr}
      onClick={disabled ? (e) => e.preventDefault() : undefined}
      className={disabled ? "disabled" : ""}
      $button={button}
    >
      <Link to={redirect}>
        {children}
        {button && (
          <>
            {" "}
            <Button
              style={{ padding: "2.5px 6px" }}
              icon={<FAIcon icon={button?.icon} mods="xs" />}
              disabled={disabled}
            >
              {button.name}
            </Button>
          </>
        )}
      </Link>
      <BorderX
        width="100%"
        color={"var(--color2)"}
        style={{ opacity: disabled ? "0.5" : "1" }}
      />
    </Div_sc>
  );
}

export default PageRedirectLink;
