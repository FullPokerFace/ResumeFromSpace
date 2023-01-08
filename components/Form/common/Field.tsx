import { PhotoInput } from "./PhotoInput";
import { RichTextInput } from "./RichTextInput";
import { TextInput } from "./TextInput";

export const Field = (props: any) => {
  function renderFormElement({ type, title, value, autoComplete }: any) {
    switch (type) {
      case "text":
        return (
          <TextInput
            value={value}
            title={title}
            autoComplete={autoComplete}
            onChange={props.onChange}
          />
        );
      case "richText":
        return (
          <RichTextInput
            value={value}
            title={title}
            autoComplete={autoComplete}
            onChange={props.onChange}
          />
        );
      case "photo":
        return (
          <PhotoInput value={value} onChange={props.onChange} title={title} />
        );
      case "date":
        return (
          <TextInput
            type={type}
            value={value}
            title={title}
            autoComplete={autoComplete}
            onChange={props.onChange}
          />
        );
      default:
        return "";
    }
  }

  return (
    <div
      className={`w-full ${props?.type === "richText" ? "" : "lg:w-1/2"}  p-2`}
    >
      {renderFormElement(props)}
    </div>
  );
};
