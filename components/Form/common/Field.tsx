import { PhotoInput } from "./PhotoInput";
import { TextInput } from "./TextInput";

export const Field = (props: any) => {
  const renderFormElement = ({ type, title, value, autoComplete }: any) => {
    if (type === "text")
      return (
        <TextInput
          value={value}
          title={title}
          autoComplete={autoComplete}
          onChange={props.onChange}
        />
      );
    if (type === "photo")
      return (
        <PhotoInput value={value} onChange={props.onChange} title={title} />
      );
    return "";
  };
  return <div className="w-full lg:w-1/2 p-2">{renderFormElement(props)}</div>;
};
