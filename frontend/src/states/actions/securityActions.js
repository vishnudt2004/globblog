import {
  // APIs
  securityApis,

  // Redux - reducers
  securityReducers,
} from "../../config/exports";

const getCurrentUser = () => async (dispatch) => {
  dispatch(securityReducers.request());

  const result = await securityApis.getCurrentUser();

  const { result: { currentUser = undefined } = {} } = result;

  dispatch(securityReducers.result({ currentUser }));
};

const securityActions = {
  getCurrentUser,
};

export default securityActions;
