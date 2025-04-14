// Node module Imports
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import UserVerification from "@/components/organisms/UserVerification";
import usePreLoader from "@/contexts/PreLoaderContext";
import userApis from "@/apis/userApis";
import { securityReducers } from "@/states/slices/securitySlice";

function DeleteUserAction_enhancer(Component, userId, setResult) {
  const Component_enhanced = (props) => {
    const dispatch = useDispatch();
    const showPreLoader = usePreLoader();

    const [verified, setVerified] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const fetchDeletionResult = async () => {
        showPreLoader(true);

        const apiData = await userApis.deleteUser({ userId });

        setResult(apiData);

        setTimeout(() => dispatch(securityReducers.clearCurrentUser()), 8000);

        showPreLoader(false);
      };

      if (verified) {
        fetchDeletionResult();
      }
    }, [dispatch, showPreLoader, verified]);

    const handleClick = () => setVisible(true);

    return (
      <>
        <Component onClick={handleClick} {...props} />

        <UserVerification
          visible={visible}
          setVisible={setVisible}
          setVerified={setVerified}
        />
      </>
    );
  };

  return Component_enhanced;
}

export default DeleteUserAction_enhancer;
