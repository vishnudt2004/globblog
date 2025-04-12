import {
  // Atoms
  FAIcon,
  Input,
} from "../../../config/exports";

function ProfileNameInput(attr) {
  return (
    <Input
      type="text"
      placeholder="PROFILE NAME"
      icon={<FAIcon icon="id-card" />}
      name="name"
      required
      {...attr}
    />
  );
}

export default ProfileNameInput;
