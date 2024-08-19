// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Export RootState and AppDispatch for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;