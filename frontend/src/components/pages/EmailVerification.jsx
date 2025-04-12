// Node module Imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  // Atoms
  VisibilityControl,

  // Organisms
  ResultPage,

  // Contexts
  usePreLoader,

  // APIs
  authApis,
} from "../../config/exports";

function EmailVerification() {
  const { userId, token } = useParams();
  const showPreLoader = usePreLoader();

  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchVerificationResult = async () => {
      showPreLoader(true);

      const resultApi = await authApis.emailVerification({ userId, token });
      setResult({ status: resultApi?.status, message: resultApi?.message });

      showPreLoader(false);
    };

    fetchVerificationResult();
  }, [showPreLoader, userId, token]);

  return (
    <VisibilityControl visible={result}>
      <ResultPage
        type={
          result?.status === "success" ||
          (result?.message && result?.message.includes("already")) // response for already verified
            ? "success"
            : "error"
        }
        message={result?.message && result?.message}
        redirectionButton={{
          name: "Go to Home",
          icon: "home",
          redirect: "/",
        }}
      />
    </VisibilityControl>
  );
}

export default EmailVerification;
