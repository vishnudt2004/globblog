import {
  // Atoms
  FAIcon,
  Input,

  // APIs
  authApis,
} from "../../../config/exports";

function GoogleOAuthInput() {
  return (
    <Input
      type="button"
      icon={<FAIcon type="brands" icon="google" />}
      value="CONTINUE WITH GOOGLE"
      width="300px"
      style={{ letterSpacing: 1.5, fontFamily: "var(--font-family_medium)" }}
      onClick={() => authApis.googleOAuth20()}
    />
  );
}
export default GoogleOAuthInput;
