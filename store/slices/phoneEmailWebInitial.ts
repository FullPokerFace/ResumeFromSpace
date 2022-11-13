import { Field } from "./formSlice";

export interface PhoneEmailWebProps {
  title: string;
  isRequired: boolean;
  isExpanded: boolean;
  fields: {
    phone: Field;
    email: Field;
    web: Field;
  };
}

export const phoneEmailWebSlice = {
  title: "Phone, Email, Web",
  isRequired: true,
  isExpanded: false,
  fields: {
    phone: {
      type: "text",
      title: "Phone",
      value: "347-677-2699",
    },
    email: {
      type: "text",
      title: "Email",
      value: "dan@trilodi.com",
    },
    web: {
      type: "text",
      title: "Web",
      value: "trilodi.com",
      autoComplete: "off",
    },
  },
};
