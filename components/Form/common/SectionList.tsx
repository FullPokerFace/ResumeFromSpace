import React, { useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import expandCollapseArrow from "../assets/img/expandCollapseArrow.svg";
import photoPlaceholder from "../assets/img/photoPlaceholder.svg";
import { Sections, setFieldValue } from "../../../store/slices/formSlice";
import { useDispatch } from "../../../store/store";
import { drawImage } from "../utils/formUtils";

const EXPAND_ALT = "Expand or Collapse Section";
const PHOTO_PLACEHOLDER_ALT = "Photo";

interface Props {
  sections: Sections;
}

const SectionList = ({ sections }: Props) => {
  const expandCollapseSection = () => {};

  return Object.keys(sections).length > 0 ? (
    Object.keys(sections).map((name) => {
      const { title, isRequired, fields } = sections[name];
      return (
        // Section
        <div key={title}>
          {/* Form Section Heading */}
          <h1 className="flex justify-between items-center">
            <span className="font-bold text-xs md:text-base">
              {title} {isRequired ? "*" : ""}
              {isRequired && (
                <span className="text-slate-400 font-thin size">
                  (required)
                </span>
              )}
            </span>
            <button className="flex" onClick={expandCollapseSection}>
              <Image src={expandCollapseArrow} alt={EXPAND_ALT} />
            </button>
          </h1>
          <FieldList fields={fields} section={name} />
        </div>
      );
    })
  ) : (
    <></>
  );
};

const FieldList = ({ fields, section }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col p-4 lg:flex-row lg:flex-wrap">
      {Object.keys(fields).length > 0 &&
        Object.keys(fields).map((name) => {
          const fieldProps = fields[name];
          return (
            <Field
              key={name}
              {...fieldProps}
              onChange={(e: InputEvent) => {
                dispatch(
                  setFieldValue({ section, field: name, value: e.target.value })
                );
              }}
            />
          );
        })}
    </div>
  );
};

const Field = (props) => {
  const renderFormElement = ({ type, title, value, autoComplete }) => {
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
  };
  return <div className="w-full lg:w-1/2 p-2">{renderFormElement(props)}</div>;
};

const TextInput = ({ value, title, autoComplete, onChange }) => (
  <label htmlFor={title} className="flex flex-col font-thin gap-y-2">
    {title}
    <input
      autoComplete={autoComplete}
      type="text"
      id={title}
      value={value}
      className="p-2 border-b font-normal border-slate-400 focus:outline-0"
      onChange={onChange}
    />
  </label>
);

const PhotoInput = ({ title, value, onChange }) => {
  const handleImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0] || null;
    if (!file) return;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      let base64data = reader.result;
      onChange({ target: { value: base64data } });
    };
  };

  useEffect(() => {
    drawImage("formPhotoCanvas", value, 75);
  }, [value]);

  return (
    <div key={title} className="flex gap-2 justify-center flex-wrap">
      <canvas width={75} height={75} id="formPhotoCanvas"></canvas>
      <div className="flex flex-col gap-y-2 items-start justify-center">
        <button className="bg-slate-800 px-4 py-2 rounded-md text-white relative hover:bg-slate-600">
          <input
            className="top-0 left-0 absolute w-full h-full opacity-0 z-10"
            type="file"
            onChange={handleImageChange}
          />
          Add Photo
        </button>
        <label htmlFor="" className="flex gap-2">
          <input type="checkbox" />
          Show photo
        </label>
      </div>
    </div>
  );
};

export default SectionList;
