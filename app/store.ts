import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {changeLangSlice} from "../features/changeLangSlice";


const store = () => configureStore({
  reducer: {
    [changeLangSlice.name]: changeLangSlice.reducer,
    
   // lang: changeLangSlice,
  },
  
});

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

export const wrapper = createWrapper(store);