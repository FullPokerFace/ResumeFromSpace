import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
    resumeId: null | string;
}

const initialState: AppState = {
    resumeId: null,
};

type setResumeId = string

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentResume: (
      state: Draft<typeof initialState>,
      action: PayloadAction<setResumeId>
    ) => {
        state.resumeId = action.payload;
    }
  },
});

// A small helper of user state for `useSelector` function.
export const getAppState = (state: { app: AppState }) => state.app;

// Exports all actions
export const {
    setCurrentResume,
} = appSlice.actions;

export default appSlice.reducer;
