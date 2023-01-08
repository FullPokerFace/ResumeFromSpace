import { DateField, Field, PhotoField } from "./formSlice";

export interface educationProps {
  title: string;
  isRequired: boolean;
  isExpanded: boolean;
  fields: {
    degree: Field;
    major: Field;
    name: Field;
    city: Field;
    from: DateField;
    to: DateField;
  };
}

export const educationSlice = {
  title: "Education",
  isRequired: true,
  isExpanded: false,
  fields: {
    degree: {
      type: "text",
      title: "Degree",
      value: "Banchelor",
    },
    major: {
      type: "text",
      title: "Major",
      value: "Computer Science",
    },
    name: {
      type: "text",
      title: "College name",
      value: 'Brooklyn College',
      autoComplete: "off",
    },
    city: {
        type: "text",
        title: "City",
        value: 'Brooklyn',
        autoComplete: "off",
    },
    from: {
        type: "date",
        title: "From",
        value: Date.now(),
    },
    to: {
        type: "date",
        title: "To",
        value: Date.now(),
    },
  },
};
