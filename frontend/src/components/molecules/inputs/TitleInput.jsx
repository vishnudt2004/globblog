import Input from "@/components/atoms/Input";
import InputCharsCounter_enhancer from "@/components/atoms/InputCharsCounter";

const Input_with_InputCharsCounter = InputCharsCounter_enhancer(Input);

function TitleInput({ charsCount, maxChars, ...attr }) {
  return (
    <Input_with_InputCharsCounter
      width="100%"
      placeholder="Write the blog title here..."
      name="title"
      id="title"
      required
      {...attr}
      charsCount={charsCount}
      maxChars={maxChars}
    />
  );
}

export default TitleInput;
