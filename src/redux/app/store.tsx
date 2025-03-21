import { configureStore } from "@reduxjs/toolkit";
import { templateApi } from "../api/baseApi";

export const store = configureStore({
  reducer: {
    [templateApi.reducerPath]: templateApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(templateApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
