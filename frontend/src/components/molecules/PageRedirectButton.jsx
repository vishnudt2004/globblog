// Node module Imports
import { useNavigate } from "react-router-dom";

import Button from "@/components/atoms/Button";
import FAIcon from "@/components/atoms/FAIcon";

function PageRedirectButton({
  children,
  icon,
  redirect,
  style,
  iconPosition = "right",
  ...attr
}) {
  const navigate = useNavigate();

  return (
    <Button
      icon={<FAIcon icon={icon} />}
      radius="30px"
      iconPosition={iconPosition}
      onClick={() =>
        typeof redirect === "function" ? redirect() : navigate(redirect)
      }
      style={{
        color: "#000",
        fontFamily: "var(--font-family_medium)",
        ...style,
      }}
      {...attr}
    >
      {children}
    </Button>
  );
}

export default PageRedirectButton;
