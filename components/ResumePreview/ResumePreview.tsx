import React, { FC, useEffect, useRef, useState } from "react";
import Breeze from "./resumesCollection/Breeze/Breeze";
import {
  getRatio,
  openResumeInNewPage,
  updateResumeOnPage,
  updateResumeOnServer,
} from "./utils/resumeUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  getFormState,
  setUpdateIn,
  setIsPreviewLoading,
  setResizeIn,
} from "../../store/slices/formSlice";
import { generateBreezeContent } from "./resumesCollection/Breeze/content";
import { Loader } from "../_common/Loader";
import generateStyles from "./resumesCollection/Breeze/styles";

let updateTimeout: any = null;
let resizeInTimeout: any = null;

const LetterSizeWidth = 850;
const LetterSizeHeight = 1100;

interface Props {
  id: string;
}

const ResumePreview: FC<Props> = (props) => {
  const { id } = props || {};
  const [componentWidth, setComponentWidth] = useState(0);

  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const { current } = resumePreviewRef || {};

  const { sections, colors, updateIn, resizeIn, isPreviewLoading } =
    useSelector(getFormState);
  const { primaryColor, secondaryColor } = colors || {};

  const dispatch = useDispatch();

  const handleDownload = async () => {
    const content = await generateBreezeContent(sections);
    const ratio = getRatio(componentWidth, LetterSizeWidth);
    const styles = generateStyles({ primaryColor, secondaryColor });

    await updateResumeOnServer(content, styles, id, sections);
    await updateResumeOnPage(sections, content, colors, ratio);

    openResumeInNewPage(id);
  };

  const handleUpdateResume = async () => {
    const content = await generateBreezeContent(sections);
    const ratio = getRatio(componentWidth, LetterSizeWidth);
    const styles = generateStyles({ primaryColor, secondaryColor });

    updateResumeOnServer(content, styles, id, sections);
    await updateResumeOnPage(sections, content, colors, ratio);

    setTimeout(() => {
      dispatch(setIsPreviewLoading(false));
    }, 200);
  };

  useEffect(() => {
    dispatch(setIsPreviewLoading(true));
    window.addEventListener("resize", () => {
      dispatch(setResizeIn({ milliseconds: 500 }));
    });
    setComponentWidth(Number(current?.offsetWidth));
  }, [current]);

  useEffect(() => {
    if (componentWidth) handleUpdateResume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentWidth]);

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
    if (resizeIn) {
      if (resizeInTimeout) {
        clearTimeout(resizeInTimeout);
      }
      resizeInTimeout = setTimeout(() => {
        setComponentWidth(Number(current?.offsetWidth));
      }, resizeIn);
      dispatch(setResizeIn({ milliseconds: null }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, updateIn, resizeIn]);

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
        style={{
          // height: `${Math.round(LetterSizeHeight * getRatio())}px`,
          color: colors.primaryColor,
        }}
      >
        <div
          className={`shadow-lg border border-slate-200 max-h-fit relative overflow-x-hidden ${
            isPreviewLoading ? "opacity-50" : ""
          }`}
          style={{
            // transform: `scale(${getRatio()})`,
            transformOrigin: "left top",
          }}
        >
          <Loader
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            isLoading={isPreviewLoading}
          />
          <Breeze sections={sections} />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
