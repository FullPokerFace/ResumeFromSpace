import React, { FC, useEffect, useState } from "react";
import { getFormState } from "../../../../store/slices/formSlice";
import { useDispatch, useSelector } from "../../../../store/store";
import { combineName, drawImage } from "../../../Form/utils/formUtils";
import { generatePDF } from "../../utils/resumeUtils";
import { NameAndPostion } from "./parts/NameAndPostion";
import { PhoneEmailWeb } from "./parts/PhoneEmailWeb";
import { Photo } from "./parts/Photo";
import backgroundImage from "./resumeBack.png";

interface Props {
  sections: any;
}

const Breeze: FC<Props> = (props) => {
  const { sections } = props || {};
  const dispatch = useDispatch();

  const { personalInformation, phoneEmailWeb } = sections || {};
  const { firstName, lastName, position, picture } =
    personalInformation?.fields || {};
  const { phone, email, web } = phoneEmailWeb?.fields || {};

  return (
    <div
      className="text-gray-800 min-h-full bg-cover flex px-[60px] py-[44px] gap-[44px]"
      style={{
        backgroundImage: `url('${backgroundImage.src}')`,
        fontFamily: "OpenSans",
      }}
    >
      <div className="w-[236px]">
        <Photo src={picture.value} />
      </div>
      <div className="w-[466px]">
        <NameAndPostion
          fullName={combineName([firstName.value, lastName.value])}
          position={position.value.toUpperCase())}
        />
        <PhoneEmailWeb
          phone={phone?.value}
          email={email?.value}
          web={web?.value}
        />
      </div>
    </div>
  );
};

export default Breeze;
