import React, { FC } from "react";

interface Props {
  fullName: string;
  position: string;
}

export const NameAndPostion: FC<Props> = (props) => {
  const { fullName, position } = props || {};
  return (
    <>
      <p className="text-[44px] font-mont tracking-[2px] ">{fullName}</p>
      <p className="text-[19px] font-mont tracking-[1px] text-gray-500">
        {position}
      </p>
    </>
  );
};
