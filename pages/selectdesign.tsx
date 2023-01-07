import Router from "next/router";
import { useDispatch } from "react-redux";
import { deleteCookie } from "../components/ResumePreview/utils/_commonUtils";
import { setCurrentResume } from "../store/slices/appSlice";
import BreezeResumeDesign from "../assets/resumeStyles/breeze.png";
import BreezeResumeDesign2 from "../assets/resumeStyles/breeze2.png";
import Image from "next/image";

const SelectDesign = () => {
  const dispatch = useDispatch();

  function hanleCreateNew() {
    deleteCookie("resume");
    dispatch(setCurrentResume(null));
    Router.push("/create");
  }

  return (
    <div className="flex justify-center w-full h-full gap-10">
      <button
        onClick={hanleCreateNew}
        className="text-slate-700  hover:scale-150 transition-all"
      >
        <img
          src={BreezeResumeDesign.src}
          alt=""
          className="h-72 shadow-lg border border-slate-200"
        />
        Breeze
      </button>
    </div>
  );
};

export default SelectDesign;
