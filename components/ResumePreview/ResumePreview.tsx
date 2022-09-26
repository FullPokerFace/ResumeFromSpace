import React, { useEffect, useRef, useState } from "react";
import Breeze from "./resumesCollection/Breeze/Breeze";
import { downloadResume } from "./utils/resumeUtils";

const LetterSizeWidth = 850;
const LetterSizeHeight = 1100;

const ResumePreview = () => {
  const [componentWidth, setComponentWidth] = useState(0);

  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const { current } = resumePreviewRef || {};

  useEffect(() => {
    window.addEventListener("resize", () => {
      setComponentWidth(Number(current?.offsetWidth));
    });
  }, [current]);

  const getRatio = () => {
    if (componentWidth < LetterSizeWidth) {
      return Number((+componentWidth / LetterSizeWidth).toFixed(3));
    }
    return 1;
  };

  useEffect(() => {
    setComponentWidth(Number(current?.offsetWidth));
  }, [current]);

  return (
    <div className="w-1/2">
      <p className="flex justify-end p-2">
        <button
          onClick={downloadResume}
          className="bg-slate-800 px-4 py-2 rounded-md text-white relative hover:bg-slate-600"
        >
          Download
        </button>
      </p>
      <div
        ref={resumePreviewRef}
        className="h-full"
        style={{
          height: `${Math.round(LetterSizeHeight * getRatio())}px`,
        }}
      >
        <Breeze height={`${Math.round(LetterSizeHeight * getRatio())}px`} />
      </div>
    </div>
  );
};

export default ResumePreview;
