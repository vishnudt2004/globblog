// Node module Imports
import styled from "styled-components";

const Div_sc = styled.div`
  position: relative;

  span.counter {
    padding: 5px;
    position: absolute;
    right: 1px;
    bottom: 1px;
    background: var(--input-color);
    opacity: 0;
    font-size: 0.8rem;
    pointer-events: none;
    transition: all 0.4s;
  }

  &:focus-within span.counter {
    background: var(--border-color);
    opacity: 1;
  }
`;

function InputCharsCounter_enhancer(Component) {
  const Component_enhanced = ({ charsCount, maxChars, ...props }) => {
    return (
      <Div_sc>
        {<Component maxLength={maxChars} {...props} />}
        <span className="counter">
          {charsCount || 0}/{maxChars}
        </span>
      </Div_sc>
    );
  };

  return Component_enhanced;
}

export default InputCharsCounter_enhancer;
