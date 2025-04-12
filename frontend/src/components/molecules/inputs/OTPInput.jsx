// Node module Imports
import { useEffect, useRef } from "react";
import styled from "styled-components";

const Div_sc = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 3px;

  input {
    flex: 1 1 40px;
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 1.1rem;
    border: 3px solid var(--border-color);
    color: var(--color);
  }
`;

function OTPInput({ length = 6, value = "", onChange }) {
  const inputsRef = useRef([]);

  // autofocus
  useEffect(() => {
    if (inputsRef.current[0]) inputsRef.current[0].focus();
  }, []);

  const onClickHandler = (index) =>
    inputsRef.current[index].setSelectionRange(1, 1);

  const onChangeHandler = ({ target: { value: inputValue } }, index) => {
    if (isNaN(inputValue)) return;

    const newValue = value.split("");
    newValue[index] = inputValue.slice(-1);
    const finalValue = newValue.join("");

    onChange(finalValue);

    if (inputValue && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const onKeyDownHandler = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !value[index]) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <Div_sc>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          name="otp"
          maxLength="1"
          value={value[index] || ""}
          inputMode="numeric"
          onClick={() => onClickHandler(index)}
          onChange={(e) => onChangeHandler(e, index)}
          onKeyDown={(e) => onKeyDownHandler(e, index)}
        />
      ))}
    </Div_sc>
  );
}

export default OTPInput;
