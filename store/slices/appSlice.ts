import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
    resumeId: null | string;
    error: null | object;
    user: null | object;
    isLoading: boolean;
}

const initialState: AppState = {
    resumeId: null,
    error: null,
    user: null,
    isLoading: false,
};

type setResumeId = string
type setError = null | object
type setUser = null | object
type setIsLoading = boolean

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
    },
    setError: (
      state: Draft<typeof initialState>,
      action: PayloadAction<setError>
    ) => {
        state.error = action.payload;
    },
    setUser: (
      state: Draft<typeof initialState>,
      action: PayloadAction<setUser>
    ) => {
        state.user = action.payload;
    },
    setIsLoading: (
      state: Draft<typeof initialState>,
      action: PayloadAction<setIsLoading>
    ) => {
        state.isLoading = action.payload;
    }
  },
});

// A small helper of user state for `useSelector` function.
export const getAppState = (state: { app: AppState }) => state.app;

// Exports all actions
export const {
    setCurrentResume,
    setError,
    setUser,
    setIsLoading
} = appSlice.actions;

export default appSlice.reducer;
