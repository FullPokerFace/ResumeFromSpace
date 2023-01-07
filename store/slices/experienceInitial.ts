import { DateField, Field, PhotoField } from "./formSlice";

export interface experienceProps {
  title: string;
  isRequired: boolean;
  isExpanded: boolean;
  fields: {
    company: Field;
    position: Field;
    from: DateField;
    to: DateField;
    summary: Field;
    responsiblities: Field;
  };
}

export const experienceSlice = {
  title: "Work Experience",
  isRequired: true,
  isExpanded: false,
  fields: {
    company: {
      type: "text",
      title: "Company Name",
      value: "Express Scripts",
    },
    position: {
      type: "text",
      title: "Position",
      value: "Front End Engineer",
    },
    from: {
      type: "date",
      title: "From",
      value: Date.now(),
      autoComplete: "off",
    },
    to: {
        type: "date",
        title: "To",
        value: Date.now(),
        autoComplete: "off",
    },
    summary: {
        type: "richText",
        title: "Summary",
        value: "",
    },
    responsiblities: {
        type: "richText",
        title: "Responsiblities",
        value: "",
    },
  },
};
