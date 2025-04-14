import styled from "styled-components";

import { CircleButton } from "@/components/atoms/Button";
import FAIcon from "@/components/atoms/FAIcon";
import Input from "@/components/atoms/Input";

const Div_sc = styled.div`
  width: 100%;
  display: flex;
  gap: 3px;
  align-items: center;

  input::placeholder {
    text-align: left;
  }

  button {
    flex-shrink: 0;
    color: var(--color);
    border-radius: 0 !important;
  }
`;

function SearchInput({ value, onSearch, ...attr }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && value.trim() !== "") {
      e.preventDefault();
      return onSearch();
    }
  };

  const handleBtnClick = () => value.trim() !== "" && onSearch();

  return (
    <Div_sc>
      <Input
        width="600px"
        height="50px"
        placeholder="Search for Title | Tags | Summary"
        style={{ width: "100%" }}
        onKeyDown={handleKeyDown}
        value={value}
        {...attr}
      />

      <CircleButton color="var(--input-color)" onClick={handleBtnClick}>
        <FAIcon icon="search" />
      </CircleButton>
    </Div_sc>
  );
}

export default SearchInput;
