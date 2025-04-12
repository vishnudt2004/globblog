// Node module Imports
import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import {
  // Redux - slices
  blogStates,
  securityStates,
} from "../config/exports";

const reducer = combineReducers({
  blog: blogStates,
  security: securityStates,
});

const store = configureStore({ reducer }, applyMiddleware(thunk));

export default store;
