import React from "react";
import { getFormState } from "../../store/slices/formSlice";
import { useSelector } from "../../store/store";
import SectionList from "./common/SectionList";

const Form = () => {
  const { sections } = useSelector(getFormState);

  return (
    <div className="flex flex-col w-full md:w-1/2 gap-2">
      <SectionList sections={sections} />
    </div>
  );
};

export default Form;
