import { Field } from "./formSlice";

export interface summaryProps {
  title: string;
  isRequired: boolean;
  isExpanded: boolean;
  fields: {
    summary: Field;
  };
}

export const summarySlice = {
  title: "Summary",
  isRequired: false,
  isExpanded: true,
  fields: {
    summary: {
      type: "richText",
      title: "",
      value: "There was a time upon which the people wouldn't talk.",
    },
  },
};
