import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

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

export interface PersonalInformationSection {
  title: string;
  isRequired: boolean;
  isExpanded: boolean;
  fields: {
    firstName: Field;
    lastName: Field;
    position: Field;
    picture: PhotoField;
  };
}

export interface Fields {
  firstName: Field;
  lastName: Field;
  position: Field;
  picture: PhotoField;
}

export interface Sections {
  personalInformation: PersonalInformationSection;
}

export interface FormState {
  sections: Sections;
}

interface ChangeFieldPayload {
  section: string;
  field: string;
  value: string;
}

/**
 * Default state object with initial values.
 */
const initialState: FormState = {
  sections: {
    personalInformation: {
      title: "Personal Information",
      isRequired: true,
      isExpanded: true,
      fields: {
        firstName: {
          type: "text",
          title: "First Name",
          value: "Josefin",
        },
        lastName: {
          type: "text",
          title: "Last Name",
          value: "Dalton",
        },
        position: {
          type: "text",
          title: "Position",
          value: "Marketing Menager",
          autoComplete: "off",
        },
        picture: {
          type: "photo",
          title: "Photo",
          value: "",
        },
      },
    },
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
  },
});

// A small helper of user state for `useSelector` function.
export const getFormState = (state: { form: FormState }) => state.form;

// Exports all actions
export const { setFieldValue } = formSlice.actions;

export default formSlice.reducer;
