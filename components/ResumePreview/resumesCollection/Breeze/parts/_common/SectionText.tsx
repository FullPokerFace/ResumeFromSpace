import React, { FC } from "react";
import { useSelector } from "react-redux";
import { getFormState } from "../../../../../../store/slices/formSlice";
interface Props {
  children: string;
  className?: string;
}

export const SectionText: FC<Props> = (props) => {
  const { colors } = useSelector(getFormState);
  const { secondaryColor } = colors || {};

  const { children, className } = props || {};
  return (
    <p
      style={{ color: secondaryColor }}
      className={`text-[13px] py-[18px] px-[4px] ${className}`}
    >
      {children}
    </p>
  );
};
