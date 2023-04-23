import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import {changeLangSlice} from "../features/changeLangSlice";


const reducer = {
  [changeLangSlice.name]: changeLangSlice.reducer,
  // other reducers go here
};

const makeStore = () => {
  const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [HYDRATE],
        },
      }),
  });
  return store;
};

// Infer the `RootState` and `AppDispatch` types from the store itself

export type AppStore = ReturnType<any>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);