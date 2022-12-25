import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../components/Form/Form";
import ResumePreview from "../components/ResumePreview/ResumePreview";
import {
  getAppState,
  setCurrentResume,
  setIsLoading,
} from "../store/slices/appSlice";
import { rehydrateFormData } from "../store/slices/formSlice";

const generateNewResumeId = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  const response = await fetch("/getNewPDFId", options);
  const result = await response.json();
  return result.insertedId;
};

const Create = () => {
  const { resumeId } = useSelector(getAppState);
  const dispatch = useDispatch();

  useGenerateNewId(dispatch, resumeId);

  if (!resumeId) return;

  return (
    <>
      <Form />
      <ResumePreview id={resumeId} />
    </>
  );
};

export default Create;

const useGenerateNewId = (dispatch, resumeId) => {
  useEffect(() => {
    const generateId = async () => {
      dispatch(setIsLoading(true));
      const id = await generateNewResumeId();
      dispatch(setCurrentResume(String(id)));
      document.cookie = `resume=${String(id)}`;
      dispatch(setIsLoading(false));
    };
    const getRehydrateData = async (id: string) => {
      try {
        dispatch(setIsLoading(true));
        const response = await fetch(`getResumeFormData/${id}`);
        const sections = await response.json();
        dispatch(rehydrateFormData({ ...sections }));
        dispatch(setCurrentResume(String(id)));
        dispatch(setIsLoading(false));
      } catch (error) {
        generateId();
      }
    };
    if (resumeId === null) {
      const hasStoredResumeId = document?.cookie
        ?.split("; ")?.[0]
        ?.split("=")[1];
      if (hasStoredResumeId) {
        getRehydrateData(hasStoredResumeId);
        return;
      }
      generateId();
    }
  }, []);
};
