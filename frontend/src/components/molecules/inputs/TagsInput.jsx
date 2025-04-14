import { useState } from "react";
import styled from "styled-components";

// Configuration Imports
import config from "@/config/config";

import Button from "@/components/atoms/Button";
import FAIcon from "@/components/atoms/FAIcon";
import Modal from "@/components/atoms/Modal";
import GeneralPlaceholders from "@/components/molecules/GeneralPlaceholders";
import { SuggestionsInput } from "@/components/atoms/Input";
import { useMessage } from "@/contexts/MessageContext";

const { CATEGORIES } = config.UI_ELEMENTS.BLOG;

const categories = CATEGORIES;
const predefinedTags = CATEGORIES.map((item) => item.category);

const Div_sc = styled.div`
  flex-direction: column;

  &,
  .inner {
    display: flex;
    gap: 10px;
  }

  .inner {
    flex-wrap: wrap;
    align-items: center;
    padding: 5px;
    border: 1px solid var(--border-color);

    button.tag {
      height: 35px;
      padding-inline: 10px 5px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--color);
      background: var(--color-2d);

      i.fa-xmark {
        width: 25px;
        height: 25px;
        display: grid;
        place-items: center;
        background: var(--color-2d);
        cursor: pointer;
      }
    }
  }
`;

function TagsInput({ maxTags = 3, value, onChange }) {
  const showMessage = useMessage();

  const [inputValue, setInputValue] = useState("");
  const [visibleModal, setVisibleModal] = useState("");

  const handleKeyDown = (e) => {
    const newTag = inputValue.trim();

    if ((e.key === "Enter" || e.key === ",") && newTag !== "") {
      e.preventDefault();

      if (value.length < maxTags) {
        if (!value.includes(newTag) && predefinedTags.includes(newTag)) {
          onChange([...value, newTag]);
          setInputValue("");
        }
      } else {
        showMessage("error", `Maximum of ${maxTags} tags allowed.`);
      }
    }
  };

  const removeTag = (indexToRemove) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <Div_sc>
        <div className="inner">
          {value.map((tag, index) => (
            <button type="button" key={index} className="tag">
              {tag}
              <FAIcon icon="xmark" onClick={() => removeTag(index)} />
            </button>
          ))}
          {value.length < maxTags && (
            <SuggestionsInput
              width="250px"
              height="35px"
              placeholder="Add a tag"
              icon={<FAIcon icon="tag" />}
              value={inputValue}
              onChange={setInputValue}
              onKeyDown={handleKeyDown}
              suggestions={predefinedTags}
            />
          )}
        </div>

        <Button
          color="var(--success-color)"
          style={{ width: "fit-content", fontSize: "0.8rem" }}
          icon={<FAIcon icon="tags" />}
          iconPosition="right"
          onClick={() => setVisibleModal(true)}
        >
          Available Tags
        </Button>
      </Div_sc>

      <Modal visible={visibleModal} setVisible={setVisibleModal}>
        <GeneralPlaceholders.Text icon="tags">
          Available Tags
        </GeneralPlaceholders.Text>
        <div
          style={{
            padding: "10px",
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {categories.map((item) => (
            <GeneralPlaceholders.Button
              key={item.category}
              style={{
                flex: "1 1 0",
                textWrap: "nowrap",
                height: "25px",
                fontSize: "0.8rem",
                color: "var(--color)",
                pointerEvents: "none",
              }}
              icon={item.icon.toLowerCase()}
            >
              {item.category}
            </GeneralPlaceholders.Button>
          ))}
        </div>
      </Modal>
    </>
  );
}

export default TagsInput;
