import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
    resumeId: null | string;
    error: null | object;
    user: null | object;
    isLoading: boolean;
    activePageTitle: null | string
}

const initialState: AppState = {
    resumeId: null,
    error: null,
    user: null,
    isLoading: false,
    activePageTitle: null
};

type setResumeId = string | null
type setError = null | object
type setUser = null | object
type setIsLoading = boolean
type setAppData = AppState
type setActivePageTitle = null | string

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
    },
    setAppData: (
      state: Draft<typeof initialState>,
      action: PayloadAction<setAppData>
    ) => {
        state = action.payload;
    },
    setActivePageTitle: (
      state: Draft<typeof initialState>,
      action: PayloadAction<setActivePageTitle>
    ) => {
        state.activePageTitle = action.payload;
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
    setIsLoading,
    setAppData,
    setActivePageTitle
} = appSlice.actions;

export default appSlice.reducer;
