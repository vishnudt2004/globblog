import {
  // Atoms
  FAIcon,
  Input,
} from "../../../config/exports";

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
