import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
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
}

export interface Colors {
  primaryColor: string;
  secondaryColor: string;
}

export interface FormState {
  updateIn: null | number;
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

/**
 * Default state object with initial values.
 */
const initialState: FormState = {
  updateIn: null,
  colors: {
    primaryColor: "#3E3A3B",
    secondaryColor: "#707070",
  },
  sections: {
    personalInformation: personalInformationSlice,
    phoneEmailWeb: phoneEmailWebSlice,
    summary: summarySlice,
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
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getFormState = (state: { form: FormState }) => state.form;

// Exports all actions
export const { setFieldValue, setExpand, setUpdateIn } = formSlice.actions;

export default formSlice.reducer;
