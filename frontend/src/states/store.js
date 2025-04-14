// Node module Imports
import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import blogStates from "@/states/slices/blogSlice";
import securityStates from "@/states/slices/securitySlice";

const reducer = combineReducers({
  blog: blogStates,
  security: securityStates,
});

const store = configureStore({ reducer }, applyMiddleware(thunk));

export default store;
