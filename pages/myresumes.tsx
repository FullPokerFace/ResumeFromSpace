import Image from "next/image";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentResume } from "../store/slices/appSlice";

const MyResumes = () => {
  const thumbs = useGetThumbs();
  if (!thumbs || (thumbs as any)?.length === 0) return <></>;

  const dispatch = useDispatch();

  const handleLoadResume = (id) => {
    document.cookie = `resume=${String(id)}`;
    dispatch(setCurrentResume(null));
    Router.push("/create");
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 gap-y-6 mx-auto h-full">
      {(thumbs as any).map((thumb) => (
        <img
          role="button"
          onClick={() => handleLoadResume(thumb.resumeId)}
          key={thumb._id}
          className="h-72 shadow-lg border border-slate-200 hover:scale-105 transition-all"
          src={thumb.thumbnail}
        />
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

const useGetThumbs = () => {
  const [thumbs, setThumbs] = useState([]);

  useEffect(() => {
    fetchNewThumbs().then((result) => setThumbs(result));
  }, []);

  return thumbs;
};

export default MyResumes;
