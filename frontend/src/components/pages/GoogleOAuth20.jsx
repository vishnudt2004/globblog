// Node module Imports
import { useSearchParams } from "react-router-dom";

import ResultPage from "@/components/organisms/ResultPage";

function GoogleOAuth20() {
  const [searchParams] = useSearchParams();
  const { status, message } = Object.fromEntries(searchParams.entries());

  return (
    <ResultPage
      type={status && status}
      message={message && message}
      redirectionButton={{ name: "Go to Home", icon: "home", redirect: "/" }}
    />
  );
}

export default GoogleOAuth20;
