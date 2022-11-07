import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  PersonalInformation,
  PersonalInformationProps,
} from "./personalInformationInitial";
import { phoneEmailWeb, PhoneEmailWebProps } from "./PhoneEmailWebInitial";

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
}

export interface FormState {
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

/**
 * Default state object with initial values.
 */
const initialState: FormState = {
  sections: {
    personalInformation: PersonalInformation,
    phoneEmailWeb: phoneEmailWeb,
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
  },
});

// A small helper of user state for `useSelector` function.
export const getFormState = (state: { form: FormState }) => state.form;

// Exports all actions
export const { setFieldValue, setExpand } = formSlice.actions;

export default formSlice.reducer;
