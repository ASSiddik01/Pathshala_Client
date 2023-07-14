import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;