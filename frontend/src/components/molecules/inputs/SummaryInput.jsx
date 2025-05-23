import InputCharsCounter_enhancer from "@/components/atoms/InputCharsCounter";
import { TextArea } from "@/components/atoms/Input";

const Input_with_InputCharsCounter = InputCharsCounter_enhancer(TextArea);

function SummaryInput({ charsCount, maxChars, ...attr }) {
  return (
    <Input_with_InputCharsCounter
      width="100%"
      height="max-content"
      placeholder="Write a summary here to help readers discover your blog..."
      style={{ minHeight: "200px" }}
      required
      name="summary"
      id="summary"
      {...attr}
      charsCount={charsCount}
      maxChars={maxChars}
    />
  );
}

export default SummaryInput;
