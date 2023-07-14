import { createSlice } from "@reduxjs/toolkit";

interface IAuth {
  token: string | null;
}

const initialState: IAuth = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInState: (state, action) => {
      state.token = action.payload.accessToken;
    },
    signOutState: (state) => {
      state.token = null;
    },
  },
});

export const { signInState, signOutState } = authSlice.actions;

export default authSlice.reducer;
