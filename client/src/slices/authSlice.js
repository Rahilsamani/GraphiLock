import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
  },
});

export const { setSignupData } = authSlice.actions;

export default authSlice.reducer;
