import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { experienceProps, experienceSlice } from "./experienceInitial";
import {
  personalInformationSlice,
  PersonalInformationProps,
} from "./personalInformationInitial";
import { phoneEmailWebSlice, PhoneEmailWebProps } from "./phoneEmailWebInitial";
import { summarySlice, summaryProps } from "./summaryInitial";

export interface Field {
  type: string;
  title: string;
  value: string;
  autoComplete?: string;
}

export interface DateField {
  type: string;
  title: string;
  value: number;
  autoComplete?: string;
}

export interface PhotoField {
  type: string;
  title: string;
  value: string;
}

export interface Fields {
  firstName: Field;
  lastName: Field;
  position: Field;
  picture: PhotoField;
}

export interface Sections {
  personalInformation: PersonalInformationProps;
  phoneEmailWeb: PhoneEmailWebProps;
  summary: summaryProps;
  experience: experienceProps;
}

export interface Colors {
  primaryColor: string;
  secondaryColor: string;
}

export interface FormState {
  isPreviewLoading: boolean;
  updateIn: null | number;
  resizeIn: null | number;
  colors: Colors;
  sections: Sections;
}

interface ChangeFieldPayload {
  section: string;
  field: string;
  value: string;
}
interface SetExpandPayload {
  section: string;
  value: boolean;
}
interface setUpdatePayload {
  milliseconds: number | null;
}
interface setResizeInPayload {
  milliseconds: number | null;
}

/**
 * Default state object with initial values.
 */
const initialState: FormState = {
  isPreviewLoading: false,
  updateIn: null,
  resizeIn: null,
  colors: {
    primaryColor: "#3E3A3B",
    secondaryColor: "#707070",
  },
  sections: {
    personalInformation: personalInformationSlice,
    phoneEmailWeb: phoneEmailWebSlice,
    summary: summarySlice,
    experience: experienceSlice,
  },
};

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFieldValue: (
      state: Draft<typeof initialState>,
      action: PayloadAction<ChangeFieldPayload>
    ) => {
      const { section, field, value } = action.payload;
      state.sections[section as keyof Sections].fields[
        field as keyof Fields
      ].value = value;
    },
    setExpand: (
      state: Draft<typeof initialState>,
      action: PayloadAction<SetExpandPayload>
    ) => {
      const { section, value } = action.payload;
      state.sections[section as keyof Sections].isExpanded = value;
    },
    setUpdateIn: (
      state: Draft<typeof initialState>,
      action: PayloadAction<setUpdatePayload>
    ) => {
      const { milliseconds } = action.payload;
      state.updateIn = milliseconds;
      state.isPreviewLoading = true;
    },
    setResizeIn: (
      state: Draft<typeof initialState>,
      action: PayloadAction<setResizeInPayload>
    ) => {
      const { milliseconds } = action.payload;
      state.resizeIn = milliseconds;
      state.isPreviewLoading = true;
    },
    setIsPreviewLoading: (
      state: Draft<typeof initialState>,
      action: PayloadAction<boolean>
    ) => {
      state.isPreviewLoading = action.payload;
    },
    rehydrateFormData: (
      state: Draft<typeof initialState>,
      action: PayloadAction<Sections>
    ) => {
      state.sections = action.payload;
    },
    setInitialFormData: (
      state: Draft<typeof initialState>
    ) => {
      state.sections = {
          personalInformation: personalInformationSlice,
          phoneEmailWeb: phoneEmailWebSlice,
          summary: summarySlice,
          experience: experienceSlice,
      };
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getFormState = (state: { form: FormState }) => state.form;

// Exports all actions
export const {
  setFieldValue,
  setExpand,
  setUpdateIn,
  setIsPreviewLoading,
  setResizeIn,
  rehydrateFormData,
  setInitialFormData
} = formSlice.actions;

export default formSlice.reducer;
