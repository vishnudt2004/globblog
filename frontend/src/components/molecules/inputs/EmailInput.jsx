import FAIcon from "@/components/atoms/FAIcon";
import Input from "@/components/atoms/Input";

function EmailInput(attr) {
  return (
    <Input
      type="email"
      placeholder="EMAIL ADDRESS"
      name="email"
      icon={<FAIcon icon="envelope" />}
      required
      {...attr}
    />
  );
}

export default EmailInput;
