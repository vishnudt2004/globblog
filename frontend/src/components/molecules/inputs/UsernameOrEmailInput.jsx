import FAIcon from "@/components/atoms/FAIcon";
import Input from "@/components/atoms/Input";

function UsernameOrEmailInput(attr) {
  return (
    <Input
      type="text"
      placeholder="USERNAME / EMAIL ADDRESS"
      icon={<FAIcon icon="user" />}
      name="username_email"
      required
      {...attr}
    />
  );
}

export default UsernameOrEmailInput;
