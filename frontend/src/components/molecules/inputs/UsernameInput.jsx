import FAIcon from "@/components/atoms/FAIcon";
import Input from "@/components/atoms/Input";

function UsernameInput(attr) {
  return (
    <Input
      type="text"
      placeholder="USERNAME"
      icon={<FAIcon icon="user" />}
      name="username"
      required
      {...attr}
    />
  );
}

export default UsernameInput;
