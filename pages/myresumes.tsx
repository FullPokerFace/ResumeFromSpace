import Image from "next/image";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteCookie,
  getSavedCookieValue,
} from "../components/ResumePreview/utils/_commonUtils";
import { setCurrentResume } from "../store/slices/appSlice";

const MyResumes = () => {
  const [thumbs, setThumbs] = useState([]);

  useEffect(() => {
    fetchNewThumbs().then((result) => setThumbs(result));
  }, []);

  const dispatch = useDispatch();

  const handleLoadResume = (id) => {
    document.cookie = `resume=${String(id)}`;
    dispatch(setCurrentResume(null));
    Router.push("/create");
  };

  const deleteResume = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({}),
    };
    await fetch(`delete/${id}`, options);
    const result = await fetchNewThumbs();
    setThumbs(result);
    if (getSavedCookieValue("resume") === id) {
      deleteCookie("resume");
      dispatch(setCurrentResume(null));
    }
  };

  if (!thumbs || (thumbs as any)?.length === 0) return <div>Nothing, here</div>;

  return (
    <div className="flex flex-wrap justify-center gap-6 gap-y-6 mx-auto h-full">
      {(thumbs as any).map((thumb) => (
        <div key={thumb._id}>
          <img
            role="button"
            onClick={() => handleLoadResume(thumb.resumeId)}
            className="h-72 shadow-lg border border-slate-200 hover:scale-105 transition-all"
            src={thumb.thumbnail}
          />
          <button
            className="bg-red-600 text-white w-full p-3 hover:bg-red-700"
            onClick={() => deleteResume(thumb.resumeId)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

const fetchNewThumbs = async () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };
  const response = await fetch("/allThumbs", options);
  const result = await response.json();
  return result;
};

export default MyResumes;
