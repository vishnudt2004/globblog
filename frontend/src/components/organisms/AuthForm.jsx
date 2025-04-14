// Node module Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import VisibilityControl from "@/components/atoms/VisibilityControl";
import BorderWithText from "@/components/molecules/BorderWithText";
import Form from "@/components/molecules/Form";
import PageRedirectLink from "@/components/molecules/PageRedirectLink";
import EmailInput from "@/components/molecules/inputs/EmailInput";
import GoogleOAuthInput from "@/components/molecules/inputs/GoogleOAuthInput";
import PasswordInput from "@/components/molecules/inputs/PasswordInput";
import ProfileNameInput from "@/components/molecules/inputs/ProfileNameInput";
import SubmitButton from "@/components/molecules/inputs/SubmitButton";
import UsernameInput from "@/components/molecules/inputs/UsernameInput";
import UsernameOrEmailInput from "@/components/molecules/inputs/UsernameOrEmailInput";
import { useMessage } from "@/contexts/MessageContext";
import { usePreLoader } from "@/contexts/PreLoaderContext";
import authApis from "@/apis/authApis";
import securityActions from "@/states/actions/securityActions";
import { removeElements } from "@/utils/jsUtils";

function RegisterInputs_internal({
  onChange,
  formData: { username, email, name, password, password_reenter },
}) {
  return (
    <>
      <UsernameInput onChange={onChange} value={username} />
      <ProfileNameInput
        onChange={onChange}
        value={name}
        title="Profile name can be edited at any time after registration and can contain any characters."
      />
      <EmailInput onChange={onChange} value={email} />
      <PasswordInput.Password onChange={onChange} value={password} />
      <PasswordInput.ConfirmPassword
        onChange={onChange}
        value={password_reenter}
      />
    </>
  );
}

function LoginInputs_internal({
  onChange,
  formData: { username_email, password },
}) {
  return (
    <>
      <UsernameOrEmailInput onChange={onChange} value={username_email} />
      <PasswordInput.Password onChange={onChange} value={password} />

      <PageRedirectLink
        redirect="/password-reset/request"
        style={{ alignSelf: "end" }}
      >
        FORGOT PASSWORD ?
      </PageRedirectLink>
    </>
  );
}

function AuthForm({
  type, // register, login
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showMessage = useMessage();
  const showPreLoader = usePreLoader();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    username_email: "",
    password: "",
    password_reenter: "",
  });

  const currentUser = useSelector((state) => state.security.currentUser);

  const typeInversion = type === "register" ? "login" : "register";

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [navigate, currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    showPreLoader(true);

    if (
      type === "register" &&
      formData.password !== formData.password_reenter
    ) {
      showPreLoader(false);

      showMessage(
        "error",
        "Password and Re-entered Password don't match. Please enter the password correctly.",
      );
      return;
    }

    const formDataTrimmed = removeElements(
      formData,
      type === "register"
        ? ["password_reenter", "username_email"]
        : ["password_reenter", "username", "email", "name"],
    );

    const result =
      type === "register"
        ? await authApis.register({ formData: formDataTrimmed })
        : type === "login" &&
          (await authApis.login({ formData: formDataTrimmed }));

    const { status, message } = result || {};

    showMessage(status, message);

    if (status === "success") {
      dispatch(securityActions.getCurrentUser());
      navigate("/");
    }

    showPreLoader(false);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <h1 className="page-heading">{type.toUpperCase()}</h1>

      <div className="inputs-group">
        <VisibilityControl
          visible={type === "register"}
          element={
            <RegisterInputs_internal
              onChange={handleInputChange}
              formData={formData}
            />
          }
          fallback={
            <LoginInputs_internal
              onChange={handleInputChange}
              formData={formData}
            />
          }
        />
      </div>

      {type === "register" ? (
        <SubmitButton icon="user-plus">REGISTER</SubmitButton>
      ) : (
        <SubmitButton icon="user-circle">LOGIN</SubmitButton>
      )}

      <PageRedirectLink
        redirect={"/" + typeInversion}
        button={{
          name: typeInversion.toUpperCase(),
          icon: `user${type === "register" ? "-circle" : "-plus"}`,
        }}
      >
        <VisibilityControl
          visible={type === "register"}
          element="IF YOU ALREADY HAVE AN ACCOUNT"
          fallback="IF YOU DO NOT HAVE AN ACCOUNT"
        />
      </PageRedirectLink>

      <BorderWithText
        width="400px"
        color="var(--color-2d)"
        style={{ fontSize: "0.8rem" }}
      >
        OR
      </BorderWithText>

      <GoogleOAuthInput />
    </Form>
  );
}

export default AuthForm;
