// Node module Imports
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  // Contexts
  useMessage,
  usePreLoader,

  // APIs
  authApis,

  // Redux - reducers
  securityReducers,
} from "../../../config/exports";

function LogoutAction_enhancer(Component) {
  const Component_enhanced = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showMessage = useMessage();
    const showPreLoader = usePreLoader();

    const handleClick = async () => {
      showPreLoader(true);

      const result = await authApis.logout();

      const { status, message } = result || {};

      showMessage(status, message);
      navigate("/");
      dispatch(securityReducers.clearCurrentUser());

      showPreLoader(false);
    };

    return (
      <Component
        onClick={handleClick}
        style={{ cursor: "pointer" }}
        {...props}
      />
    );
  };

  return Component_enhanced;
}

export default LogoutAction_enhancer;
