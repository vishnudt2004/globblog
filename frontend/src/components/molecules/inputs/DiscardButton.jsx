// Node module Imports
import { useNavigate } from "react-router-dom";

import SubmitButton from "@/components/molecules/inputs/SubmitButton";

function DiscardButton_enhancer(
  Component,
  { navigation = "/", buttonText = "DISCARD EDIT", icon = "ban", style = {} },
) {
  const navigate = useNavigate();

  const Component_enhanced = ({ discardNavigation, ...props }) => {
    return (
      <div
        style={{
          alignSelf: "center",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <SubmitButton
          type_attr="button"
          icon={icon}
          style={{
            width: "250px",
            height: "50px",
            fontWeight: "bold",
            color: "var(--error-color)",
            ...style,
          }}
          onClick={() => navigate(discardNavigation || navigation)}
        >
          {buttonText}
        </SubmitButton>
        {<Component {...props} />}
      </div>
    );
  };

  return Component_enhanced;
}

export default DiscardButton_enhancer;
