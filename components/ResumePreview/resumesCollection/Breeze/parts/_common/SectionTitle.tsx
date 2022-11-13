import React, { FC } from "react";
interface Props {
  label: string;
  className?: string;
}

export const SectionTitle: FC<Props> = (props) => {
  const { label, className } = props || {};
  return (
    <p
      className={`text-[20px] pb-[14px] tracking-[4px] border-b border-gray-600 ${className}`}
    >
      {label.toUpperCase()}
    </p>
  );
};
