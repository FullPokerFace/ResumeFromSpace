import React, { FC, MouseEventHandler } from "react";

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  label?: string;
  className?: string;
}

const PrimaryButton: FC<Props> = (props) => {
  const { onClick = () => {}, label = "Button", className = "" } = props || {};
  return (
    <button
      onClick={onClick}
      className={`bg-slate-800 px-4 py-2 rounded-md text-white relative hover:bg-slate-600 ${className}`}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
