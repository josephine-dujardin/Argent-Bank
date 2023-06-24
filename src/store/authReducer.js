import { createAction, createReducer } from "@reduxjs/toolkit";

// Define action creators using createAction
export const updateToken = createAction("auth/updateToken");
export const resetToken = createAction("auth/resetToken");
export const updateProfile = createAction("auth/updateProfile");

// Define the initial state for the auth reducer
const initialState = {
    token: null,
    profile: {},
  };

  // Create the auth reducer using createReducer
const authReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(updateToken, (state, action) => {
        state.token = action.payload;
      })
      .addCase(resetToken, (state) => {
        state.token = null;
      })
      .addCase(updateProfile, (state, action) => {
        state.profile = action.payload;
      });
  });

export default authReducer;
