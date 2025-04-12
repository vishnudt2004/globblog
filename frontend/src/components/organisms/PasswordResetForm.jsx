// Node module Imports
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  // Atoms
  BorderX,
  VisibilityControl,

  // Molecules
  Form,
  PageRedirectButton,
  // inputs
  EmailInput,
  PasswordInput,
  SubmitButton,

  // Contexts
  useMessage,
  usePreLoader,

  // APIs
  authApis,

  // Utilities
  removeElements,
} from "../../config/exports";

function RequestInputs_internal({ onChange, formData: { email } }) {
  return <EmailInput onChange={onChange} value={email} />;
}

function ResetInputs_internal({
  onChange,
  formData: { password, password_reenter },
}) {
  return (
    <>
      <PasswordInput.Password onChange={onChange} value={password} />
      <PasswordInput.ConfirmPassword
        onChange={onChange}
        value={password_reenter}
      />
    </>
  );
}

function PasswordResetForm({
  type, // request, reset
}) {
  const navigate = useNavigate();
  const { userId, token } = useParams();
  const showMessage = useMessage();
  const showPreLoader = usePreLoader();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_reenter: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    showPreLoader(true);

    if (type === "reset" && formData.password !== formData.password_reenter) {
      showPreLoader(false);

      showMessage(
        "error",
        "Password and Re-entered Password don't match. Please enter the password correctly."
      );
      return;
    }

    const formDataTrimmed = removeElements(
      formData,
      type === "request" ? ["password", "password_reenter"] : ["email"]
    );

    const result =
      type === "request"
        ? await authApis.passwordResetRequest({ formData: formDataTrimmed })
        : await authApis.passwordReset({
            userId,
            token,
            formData: formDataTrimmed,
          });

    const { status, message } = result || {};

    showMessage(status, message);

    if (status === "success") navigate("/");

    showPreLoader(false);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <h1 className="page-heading">PASSWORD RESET</h1>

      <div className="inputs-group">
        <VisibilityControl
          visible={type === "request"}
          element={
            <RequestInputs_internal
              onChange={handleInputChange}
              formData={formData}
            />
          }
          fallback={
            <ResetInputs_internal
              onChange={handleInputChange}
              formData={formData}
            />
          }
        />
      </div>

      {type === "request" ? (
        <SubmitButton icon="share">SEND REQUEST</SubmitButton>
      ) : (
        <SubmitButton icon="rotate-right">RESET PASSWORD</SubmitButton>
      )}

      {type === "reset" && (
        <>
          <BorderX />
          <PageRedirectButton icon="user-circle" redirect="/login">
            GO TO LOGIN
          </PageRedirectButton>
        </>
      )}
    </Form>
  );
}

export default PasswordResetForm;
