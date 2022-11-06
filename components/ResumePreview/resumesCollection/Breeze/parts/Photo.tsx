import React, { useEffect } from "react";
import { drawImage } from "../../../../Form/utils/formUtils";
import { RESUME_IMAGE_WIDTH } from "../../../constants";

interface Props {
  src?: string;
}

export const Photo: FC<Props> = (props) => {
  const { src } = props || {};
  useEffect(() => {
    drawImage("resumePhotoCanvas", src, RESUME_IMAGE_WIDTH);
  }, [src]);
  return (
    <canvas
      width={RESUME_IMAGE_WIDTH}
      height={RESUME_IMAGE_WIDTH}
      id="resumePhotoCanvas"
    ></canvas>
  );
};
