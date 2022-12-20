import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppState, setError } from "../../store/slices/appSlice";

const GlobalError = () => {
  const [isClosing, setIsClosing] = useState(false);
  const { error } = useSelector(getAppState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setError(null));
    document.addEventListener("click", () => {
      handleErrorCloseClick();
    });
  }, []);

  const handleErrorCloseClick = () => {
    if (!isClosing) {
      setTimeout(() => {
        setIsClosing(false);
        dispatch(setError(null));
      }, 180);
      setIsClosing(true);
    }
  };

  if (!error) return <></>;
  return (
    <div
      className={`
            fixed m-10 p-6 rounded-md top-10 left-0 right-0  flex justify-center bg-red-500 z-50 text-white font-semibold 
            ${isClosing ? "animate-fadeIn" : "animate-fadeOut"}
            `}
    >
      {(error as any).message}
      <button
        onClick={handleErrorCloseClick}
        className="absolute top-1/2 -translate-y-1/2 right-4"
      >
        {closeSVG}
      </button>
    </div>
  );
};

export default GlobalError;

const closeSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
