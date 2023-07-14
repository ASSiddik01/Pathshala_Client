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
  },
});

export const { signInState } = authSlice.actions;

export default authSlice.reducer;
