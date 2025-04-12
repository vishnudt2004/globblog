// Node module Imports
import styled from "styled-components";

const Form_sc = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  padding-bottom: 5rem;

  h1.page-heading {
    letter-spacing: 1.5;
    text-align: center;
    position: relative;

    &::after {
      content: "";
      width: 50%;
      height: 2px;
      margin: auto;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      background: var(--theme-color);
    }
  }

  .inputs-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

function Form({ children, ...attr }) {
  return <Form_sc {...attr}>{children}</Form_sc>;
}

export default Form;
