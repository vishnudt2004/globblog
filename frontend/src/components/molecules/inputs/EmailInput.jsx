import {
  // Atoms
  FAIcon,
  Input,
} from "../../../config/exports";

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
