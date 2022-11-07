import { Field, PhotoField } from "./formSlice";

export interface PersonalInformationProps {
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

export const PersonalInformation = {
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
};
