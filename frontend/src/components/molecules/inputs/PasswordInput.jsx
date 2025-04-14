// Node module Imports
import styled from "styled-components";
import { useState } from "react";

import FAIcon from "@/components/atoms/FAIcon";
import Input from "@/components/atoms/Input";
import { colorMix } from "@/utils/cssUtils";

const Div_sc = styled.div`
  display: flex;
  position: relative;

  &:focus-within i[class*="eye"] {
    background: var(--background-color);
  }

  i[class*="eye"] {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 60px;
    background: var(--input-color);
    cursor: pointer;
    color: #777;

    &:hover {
      color: ${() => colorMix("#777", "var(--color)", "30%")};
    }
  }
`;

function PasswordInput(attr) {
  const [visible, setVisible] = useState(false);

  return (
    <Div_sc>
      <Input
        type={!visible ? "password" : "text"}
        placeholder="PASSWORD"
        icon={<FAIcon icon="key" />}
        name="password"
        required
        {...attr}
      />
      <FAIcon
        icon={visible ? "eye-slash" : "eye"}
        onClick={() => setVisible((p) => !p)}
      />
    </Div_sc>
  );
}

function ConfirmPasswordInput(attr) {
  const [visible, setVisible] = useState(false);

  return (
    <Div_sc>
      <Input
        type={!visible ? "password" : "text"}
        placeholder="RE-ENTER PASSWORD"
        icon={<FAIcon icon="key" />}
        name="password_reenter"
        required
        {...attr}
      />
      <FAIcon
        icon={visible ? "eye-slash" : "eye"}
        onClick={() => setVisible((p) => !p)}
      />
    </Div_sc>
  );
}

export default {
  Password: PasswordInput,
  ConfirmPassword: ConfirmPasswordInput,
};
