import React from "react";
import { useSelector } from "react-redux";
import { getAppState } from "../../store/slices/appSlice";

const Loader = () => {
  const { isLoading } = useSelector(getAppState);

  if (!isLoading) return <></>;
  return (
    <div
      className={`
          fixed m-10 p-6 rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center z-50 text-white font-semibold`}
    >
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
