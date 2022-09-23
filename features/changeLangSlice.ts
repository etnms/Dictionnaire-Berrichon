import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { HYDRATE } from "next-redux-wrapper";

// Define a type for the slice state
interface IChangeLangState {
  value: string;
}

// Define the initial state using that type
const initialState: IChangeLangState = {
  // default value to ber
  value: "ber",
};

export const changeLangSlice = createSlice({
  name: "changeLang",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },

   // Special reducer for hydrating the state. Special case for next-redux-wrapper
   extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.changeLang,
      };
    },
  },
});


export const { changeLang } = changeLangSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectChangeLang = (state: RootState) => state.changeLang.value;


export default changeLangSlice.reducer;
