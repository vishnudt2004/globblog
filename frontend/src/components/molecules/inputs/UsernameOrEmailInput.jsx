import {
  // Atoms
  FAIcon,
  Input,
} from "../../../config/exports";

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
