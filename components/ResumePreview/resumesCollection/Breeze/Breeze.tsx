import React, { useEffect, useState } from "react";
import { getFormState } from "../../../../store/slices/formSlice";
import { useDispatch, useSelector } from "../../../../store/store";
import { drawImage } from "../../../Form/utils/formUtils";
import { previewResume } from "../../utils/resumeUtils";
import backgroundImage from "./resumeBack.png";

interface Props {
  height: string;
}

const Breeze = ({ height }: Props) => {
  const dispatch = useDispatch();
  const { sections } = useSelector(getFormState);

  useEffect(() => {
    previewResume(sections);
  }, [sections]);

  return (
    <div
      className="shadow-lg border border-slate-200 "
      style={{
        transformOrigin: "left top",
        backgroundImage: `url('${backgroundImage.src}')`,
        fontFamily: "OpenSans",
      }}
    >
      <object
        style={{
          width: "100%",
          height: height,
        }}
        id="resumePreviewPdf"
        type="application/pdf"
      ></object>
    </div>
  );
};

export default Breeze;
