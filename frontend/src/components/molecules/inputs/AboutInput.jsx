import InputCharsCounter_enhancer from "@/components/atoms/InputCharsCounter";
import { TextArea } from "@/components/atoms/Input";

const TextArea_with_InputCharsCounter = InputCharsCounter_enhancer(TextArea);

function AboutInput({ charsCount, maxChars, ...attr }) {
  return (
    <div style={{ maxHeight: "max-content" }}>
      <TextArea_with_InputCharsCounter
        className="secondary-scrollbar"
        placeholder="Something About You..."
        name="about"
        height="unset"
        style={{ minHeight: "inherit", maxHeight: "inherit" }}
        {...attr}
        charsCount={charsCount}
        maxChars={maxChars}
      />
    </div>
  );
}

export default AboutInput;
