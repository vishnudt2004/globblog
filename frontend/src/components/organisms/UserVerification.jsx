// Node module Imports
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

// Configuration Imports
import config from "../../config/config";

import {
  // Atoms
  Button,
  Center,
  CountDown,
  FAIcon,
  Modal,
  PreLoaderMini,

  // Molecules
  Form,
  PageRedirectButton,
  PageRedirectLink,
  // inputs
  OTPInput,
  PasswordInput,
  SubmitButton,

  // Contexts
  useMessage,

  // APIs
  securityApis,

  // Utilities
  durationToMs,
} from "../../config/exports";

function OTPInput_mod({ countDownRef, value, onChange, resendOTP }) {
  const { OTP_LENGTH, OTP_EXPIRETIME } = config.UI_ELEMENTS.USER_VERIFICATION;

  const [disableResent, setDisableResent] = useState(true);

  useEffect(() => {
    if (countDownRef.current) {
      const timer = setTimeout(
        () => setDisableResent(false),
        durationToMs(OTP_EXPIRETIME)
      );
      return () => clearTimeout(timer);
    }
  }, [countDownRef, OTP_EXPIRETIME]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <OTPInput length={OTP_LENGTH} value={value} onChange={onChange} />
      <span
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CountDown countDown={OTP_EXPIRETIME} ref={countDownRef} />
        <PageRedirectLink
          onClick={resendOTP}
          style={{ alignSelf: "end" }}
          disabled={disableResent}
        >
          RESEND OTP
        </PageRedirectLink>
      </span>
    </div>
  );
}

function UserVerification({ visible, setVisible, setVerified }) {
  const showMessage = useMessage();

  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState({
    status: null,
    message: null,
    verified: false,
  });
  const [loading, setLoading] = useState(false);

  const countDown_ref = useRef(null);

  const currentUser = useSelector((state) => state.security.currentUser);

  const googleUser = currentUser?.googleId || null;

  useEffect(() => {
    const fetchGetOTP = async () => {
      setLoading(true);

      const apiData = await securityApis.getOTP();

      const { status, message } = apiData;

      setResult((p) => ({ ...p, status, message }));

      setLoading(false);
    };

    if (visible && googleUser) {
      fetchGetOTP(); // send OTP automatically.
    }
  }, [showMessage, visible, googleUser]);

  useEffect(() => {
    // send verified status to parent & close modal if verfied

    const { verified } = result;
    setVerified(verified);

    if (verified) setVisible(false);
  }, [setVerified, setVisible, result]);

  useEffect(() => {
    const { status, message } = result;
    if (status && message) showMessage(status, message);
  }, [showMessage, result]);

  const resetCD = () => countDown_ref.current?.reset(); // reset count down
  const resendOTP = async () => {
    setLoading(true);

    const apiData = await securityApis.getOTP();

    const { status, message } = apiData;

    setResult((p) => ({ ...p, status, message }));

    setLoading(false);

    setOtp("");
    resetCD();
  };

  const handlePWChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOTPChange = (val) => setOtp(val);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await (!googleUser
      ? securityApis.validatePassword({ formData: { password } })
      : securityApis.verifyOTP({ formData: { otp } }));

    const { status, message, result: { verified = false } = {} } = response;

    setResult({ status, message, verified });

    setPassword("");
    setOtp("");

    setLoading(false);
  };

  return (
    <Modal
      visible={visible}
      onClose={() => {
        setVisible(false);
        setPassword("");
        setOtp("");
      }}
    >
      <div>
        <Form onSubmit={handleFormSubmit} style={{ paddingTop: "25px" }}>
          <h4>ENTER YOUR {!googleUser ? "PASSWORD" : "OTP"}</h4>
          <div className="inputs-group">
            {!loading ? (
              <>
                {!googleUser ? (
                  <PasswordInput.Password
                    onChange={handlePWChange}
                    value={password}
                    style={{ maxWidth: "80vw" }}
                  />
                ) : (
                  <OTPInput_mod
                    countDownRef={countDown_ref}
                    value={otp}
                    onChange={handleOTPChange}
                    resendOTP={resendOTP}
                  />
                )}
              </>
            ) : (
              <PreLoaderMini />
            )}
          </div>
          <SubmitButton />
        </Form>
      </div>
    </Modal>
  );
}

function CancellationComponent({
  message = "The action has been cancelled.",
  continueButton = { name: "Continue Action", icon: "play" },
  redirectButton = { name: "Go Back to Home", link: "/", icon: "home" },
  onContinue,
}) {
  return (
    <Center style={{ gap: "3rem" }}>
      <h3 style={{ textAlign: "center" }}>{message}</h3>

      <div
        style={{
          maxWidth: "80vw",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <Button
          radius="30px"
          icon={<FAIcon icon={continueButton.icon} />}
          iconPosition="right"
          style={{
            flex: 1,
            fontFamily: "var(--font-family_medium)",
            minWidth: "250px",
          }}
          onClick={onContinue}
        >
          {continueButton.name}
        </Button>

        {redirectButton && (
          <PageRedirectButton
            radius="30px"
            icon={redirectButton?.icon}
            iconPosition="right"
            style={{ flex: 1, minWidth: "250px" }}
            redirect={redirectButton.link}
          >
            {redirectButton.name}
          </PageRedirectButton>
        )}
      </div>
    </Center>
  );
}

function UserVerification_enhancer(
  Component,
  cancellationFallback = {},
  initialVisible = true
) {
  const {
    CancelComponent, // custom cancellation component (you may can't set continue-action button)
    ...cancellationComponentProps // pre-defined cancellation component props
  } = cancellationFallback;

  const Component_enhanced = (props) => {
    const [visible, setVisible] = useState(initialVisible);
    const [verified, setVerified] = useState(false);

    return (
      <>
        <UserVerification
          visible={visible}
          setVisible={setVisible}
          setVerified={setVerified}
        />
        {verified ? (
          <Component {...props} />
        ) : (
          <>
            {CancelComponent || (
              <CancellationComponent
                {...cancellationComponentProps}
                onContinue={() => setVisible(true)}
              />
            )}
          </>
        )}
      </>
    );
  };

  return Component_enhanced;
}

export default UserVerification;
export { UserVerification_enhancer, CancellationComponent };
