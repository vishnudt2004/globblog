// Node module Imports
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "@/components/atoms/Button";
import FAIcon from "@/components/atoms/FAIcon";

const Div_sc = styled.div`
  width: 400px;
  max-width: 95vw;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;

  .btn {
    flex: 1 1 170px;
    height: 40px;
    color: #000;
    border-radius: 50px;

    &,
    & > button {
      font-size: 0.8rem;
    }

    i {
      font-size: 0.7rem;
    }
  }
`;

function OwnerControls({ children, owner, ...attr }) {
  return owner && <Div_sc {...attr}>{children}</Div_sc>;
}

function EditButton({ children = "Edit", route, ...attr }) {
  const navigate = useNavigate();

  return (
    <Button
      className="btn"
      icon={<FAIcon icon="pen" />}
      color="var(--color-2d)"
      style={{ color: "var(--color)" }}
      onClick={() => navigate(route)}
      {...attr}
    >
      {children}
    </Button>
  );
}

function DeleteButton({ children = "Delete", ...attr }) {
  return (
    <Button
      className="btn"
      icon={<FAIcon icon="trash" />}
      color="var(--color-2d)"
      style={{ color: "var(--color)" }}
      {...attr}
    >
      {children}
    </Button>
  );
}

export default OwnerControls;
export { EditButton, DeleteButton };
