import FAIcon from "@/components/atoms/FAIcon";
import Input from "@/components/atoms/Input";

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
