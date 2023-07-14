import { createSlice } from "@reduxjs/toolkit";

interface IAuth {
  token: string | null;
  user: {
    email: string;
    _id: string;
  } | null;
}

const initialState: IAuth = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
