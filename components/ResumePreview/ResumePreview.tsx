import React, { useEffect, useRef, useState } from "react";
import Breeze from "./resumesCollection/Breeze/Breeze";
import { updateResume } from "./utils/resumeUtils";
import { useDispatch, useSelector } from "react-redux";
import { getFormState, setUpdateIn } from "../../store/slices/formSlice";
import { generateBreezeContent } from "./resumesCollection/Breeze/content";

let updateTimeout: any = null;

const LetterSizeWidth = 850;
const LetterSizeHeight = 1100;

const ResumePreview = () => {
  const [componentWidth, setComponentWidth] = useState(0);

  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const { current } = resumePreviewRef || {};

  const { sections, colors, updateIn } = useSelector(getFormState);
  const dispatch = useDispatch();

  const getRatio = () => {
    if (componentWidth < LetterSizeWidth) {
      return Number((+componentWidth / LetterSizeWidth).toFixed(3));
    }
    return 1;
  };

  const handleDownload = async () => {
    const content = await generateBreezeContent(sections);
    updateResume(sections, content, colors, true, getRatio());
  };

  const handleUpdateResume = async () => {
    const content = await generateBreezeContent(sections);
    updateResume(sections, content, colors, false, getRatio());
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setComponentWidth(Number(current?.offsetWidth));
    });
  }, [current]);

  useEffect(() => {
    if (updateIn) {
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
      updateTimeout = setTimeout(() => {
        handleUpdateResume();
      }, updateIn);
      dispatch(setUpdateIn({ milliseconds: null }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, updateIn]);

  useEffect(() => {
    setComponentWidth(Number(current?.offsetWidth));
  }, [current]);

  return (
    <div className="w-full md:w-1/2">
      <p className="flex justify-end p-2">
        <button
          onClick={handleDownload}
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
          color: colors.primaryColor,
        }}
      >
        <div
          className={`shadow-lg border border-slate-200 max-h-fit `}
          style={{
            // transform: `scale(${getRatio()})`,
            transformOrigin: "left top",
          }}
        >
          <Breeze sections={sections} />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
