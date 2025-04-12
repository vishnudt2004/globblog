// Node module Imports
import { createSlice } from "@reduxjs/toolkit";

const name = "blog";
const initialState = { latest: { blogs: [], totalPages: 0, currentPage: 0 } };
const reducers = {
  result(state = initialState, action) {
    return {
      ...state,
      latest: {
        ...state.latest,
        blogs: action.payload.latest?.blogs ?? state.latest.blogs,
        totalPages:
          action.payload.latest?.totalPages ?? state.latest.totalPages,
        currentPage:
          action.payload.latest?.currentPage ?? state.latest.currentPage,
      },
    };
  },
  resetResult(state, action) {
    if (action.payload)
      return {
        ...state,
        [action.payload]: initialState[action.payload],
      }; // Reset only the specified key

    return initialState; // Reset entire state
  },
};

const blogSlice = createSlice({
  name,
  initialState,
  reducers,
});

const { actions, reducer } = blogSlice;

export default reducer;
export { actions as blogReducers }; // { request, result, resetResult }
