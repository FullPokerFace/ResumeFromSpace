import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../components/Form/Form";
import Header from "../components/Header/Header";
import ResumePreview from "../components/ResumePreview/ResumePreview";
import { getAppState, setCurrentResume } from "../store/slices/appSlice";
import { rehydrateFormData } from "../store/slices/formSlice";
import styles from "../styles/Home.module.css";

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
    <div className={styles.container}>
      <main className="container flex flex-col mx-auto p-4 min-h-screen overflow-hidden">
        <Header />
        <div className="flex flex-col md:flex-row gap-8 flex-1 mt-16">
          <Form />
          <ResumePreview id={resumeId} />
        </div>
      </main>
    </div>
  );
};

export default Create;

const useGenerateNewId = (dispatch, resumeId) => {
  useEffect(() => {
    const generateId = async () => {
      const id = await generateNewResumeId();
      dispatch(setCurrentResume(String(id)));
      document.cookie = `resume=${String(id)}`;
    };
    const getRehydrateData = async (id: string) => {
      const response = await fetch(`getResumeFormData/${id}`);
      const sections = await response.json();
      dispatch(rehydrateFormData({ ...sections }));
      dispatch(setCurrentResume(String(id)));
    };
    if (resumeId === null) {
      const hasStoredId = document?.cookie?.split("=")?.[1];
      if (hasStoredId) {
        getRehydrateData(hasStoredId);
        return;
      }
      generateId();
    }
  }, []);
};
