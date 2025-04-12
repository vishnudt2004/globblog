// Node module Imports
import { createSlice } from "@reduxjs/toolkit";

const name = "security";
const initialState = {
  loading: false,
  loading_currentUser: true,
  currentUser: null,
};
const reducers = {
  request(state = initialState) {
    return { ...state, loading: true };
  },
  result(state = initialState, action) {
    const { currentUser } = action.payload;

    return {
      ...state,
      loading: false,
      currentUser: currentUser || null,
      loading_currentUser: false,
    };
  },
  clearCurrentUser(state = initialState) {
    return {
      ...state,
      currentUser: null,
    };
  },
};

const securitySlice = createSlice({
  name,
  initialState,
  reducers,
});

const { actions, reducer } = securitySlice;

export default reducer;
export { actions as securityReducers }; // { request, result, resetResult, clearCurrentUser }
