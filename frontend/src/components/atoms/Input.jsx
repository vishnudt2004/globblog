// Node module Imports
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import {
  // Utilities
  colorMix,
} from "../../config/exports";

const Div_sc = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  max-width: 95vw;
  display: flex;
  align-items: center;
  gap: 3px;
  position: relative;

  input,
  textarea {
    min-width: 0;
  }

  input,
  textarea,
  span {
    background: var(--input-color);
    transition: background 0.4s, box-shadow 0.4s;
  }

  input,
  textarea {
    flex: 1 1 0;
    max-width: ${({ $icon, height }) =>
      $icon ? `calc(100% - ${height})` : "100%"};
    min-height: inherit;
    max-height: inherit;
    height: 100%;
    padding: 10px;
    color: var(--color);
    border-radius: ${({ $icon, $radius }) =>
      $radius ? ($icon ? `${$radius} 0 0 ${$radius}` : $radius) : "0"};
  }

  span {
    width: ${({ height }) => height};
    height: ${({ height }) => height};
    display: grid;
    place-items: center;
    border-radius: ${({ $radius }) =>
      $radius ? `0 ${$radius} ${$radius} 0` : "0"};
  }

  :is(input, textarea)::placeholder {
    color: var(--color2);
    text-align: center;
    letter-spacing: 2;
  }

  :is(input:not([type="submit"], [type="button"]), textarea):focus,
  :is(input:not([type="submit"], [type="button"]), textarea):focus + span {
    background: var(--background-color);
    box-shadow: inset 0 0 0 1px var(--color);
  }

  input:is([type="button"], [type="submit"]):is(:focus, :hover) {
    &,
    & + span {
      cursor: pointer;
      background-color: ${() =>
        colorMix("var(--input-color)", "var(--color)", "20%")};
    }
  }

  :is(input, textarea):disabled,
  :is(input, textarea):disabled + span {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* .disabled-input {
    position: relative;

    &::before,
    &::after {
      content: "";
      width: 100%;
      height: 1px;
      margin: auto;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: var(--error-color);
      transform: rotate(-45deg);
    }

    &::after {
      transform: rotate(45deg);
    }
  } */
`;

function Input({
  width = "400px",
  height = "50px",
  type = "text",
  icon,
  radius,
  style,
  value,
  disabled,
  ...attr
}) {
  const inputRef = useRef(null);

  return (
    <Div_sc
      width={width}
      height={height}
      $radius={radius}
      $icon={icon}
      style={style}
    >
      <input
        ref={inputRef}
        type={type}
        autoComplete="off"
        value={value}
        disabled={disabled}
        {...attr}
      />
      {icon /* && !disabled */ && (
        <span
          onClick={() => (inputRef.current ? inputRef.current.focus() : null)}
        >
          {icon}
        </span>
      )}
      {/* {disabled && <span className="disabled-input" />} */}
    </Div_sc>
  );
}

function TextArea({
  width = "400px",
  height = "50px",
  type = "text",
  icon,
  radius,
  style,
  disabled,
  ...attr
}) {
  const inputRef = useRef(null);

  return (
    <Div_sc
      width={width}
      height={height}
      $radius={radius}
      $icon={icon}
      style={style}
    >
      <textarea
        ref={inputRef}
        type={type}
        autoComplete="off"
        {...attr}
        disabled={disabled}
        style={{ resize: style?.resize || "both" }}
      />
      {icon && (
        <span
          onClick={() => (inputRef.current ? inputRef.current.focus() : null)}
        >
          {icon}
        </span>
      )}
    </Div_sc>
  );
}

const Div_sc2 = styled.div`
  position: relative;

  ul.suggestions {
    list-style-type: none;
    width: 100%;
    max-height: 150px;
    padding: 5px;
    position: absolute;
    top: calc(100% + 5px);
    background: var(--background-color);
    border: 1px solid var(--border-color);
    overflow: auto;

    li {
      transition: background 0.4s, padding 0.1s;

      &:hover {
        background: var(--color-2d);
        padding: 3px 6px;
        cursor: pointer;
      }
    }
  }
`;

function SuggestionsInput({ suggestions, value, onChange, ...attr }) {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    if (suggestions && value.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredSuggestions(filtered);
    }
  }, [value, suggestions]);

  return (
    <Div_sc2>
      <div ref={inputRef}>
        <Input
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val);
          }}
          {...attr}
        />
      </div>
      {!!filteredSuggestions.length && !!value.length && (
        <ul className="secondary-scrollbar suggestions">
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => {
                onChange(suggestion);
                setFilteredSuggestions([]);
                inputRef.current?.querySelector("input").focus();
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </Div_sc2>
  );
}

export default Input;
export { TextArea, SuggestionsInput };
