import Image from "next/image";
import React, { FC, useState } from "react";
import expandCollapseArrow from "../assets/img/expandCollapseArrow.svg";
import AnimatedHeightContainer from "../../_common/AnimatedHeightContainer";
import { FieldList } from "./FieldList";
import { useDispatch } from "react-redux";
import { Fields, setExpand } from "../../../store/slices/formSlice";

const EXPAND_ALT = "Expand or Collapse Section";

interface Props {
  title: string;
  sectionName: string;
  isRequired: boolean;
  isExpanded: boolean;
  fields: Fields;
}

export const Section: FC<Props> = (props) => {
  const { title, isRequired, fields, isExpanded, sectionName } = props || {};
  const dispatch = useDispatch();

  const expandCollapseSection = () => {
    dispatch(
      setExpand({
        section: sectionName,
        value: !isExpanded,
      })
    );
  };

  return (
    <div key={title}>
      {/* Form Section Heading */}
      <button
        className="flex justify-between items-center w-full gap-2"
        onClick={expandCollapseSection}
      >
        <span className="font-bold text-lg sm:text-s md:text-base text-left">
          {title}{" "}
          <span className="whitespace-nowrap">
            {isRequired ? "*" : ""}
            {isRequired && (
              <span className="text-slate-400 font-thin size">(required)</span>
            )}
          </span>
        </span>
        <span
          className={`flex transition-all ${
            isExpanded ? "rotate-90" : "rotate-0"
          }`}
        >
          <Image src={expandCollapseArrow} alt={EXPAND_ALT} />
        </span>
      </button>
      <AnimatedHeightContainer open={isExpanded}>
        <FieldList fields={fields} section={sectionName} />
      </AnimatedHeightContainer>
    </div>
  );
};
