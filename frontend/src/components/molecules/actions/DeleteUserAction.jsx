// Node module Imports
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  // Organisms
  UserVerification,

  // Contexts
  usePreLoader,

  // APIs
  userApis,

  // Redux - reducers
  securityReducers,
} from "../../../config/exports";

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
