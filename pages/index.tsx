import type { NextPage } from "next";
import Image from "next/image";
import { TextInput } from "../components/Form/common/TextInput";
import loginLogo from "../assets/loginLogo.svg";
import { useState } from "react";
import Router from "next/router";
import { getAppState } from "../store/slices/appSlice";
import { useSelector } from "react-redux";
import PrimaryButton from "../components/_common/PrimaryButton";
import LoginOptions from "../components/LogInOptions/LoginOptions";

const Home: NextPage = () => {
  const { user } = useSelector(getAppState);

  const handleStartNewResumeClick = () => {
    Router.push("/create");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center m-auto ">
      <div className="w-full flex justify-center md:justify-end animate-fly">
        <Image src={loginLogo} alt="Login"></Image>
      </div>
      <div className="p-8 flex flex-col justify-center gap-4 w-full max-w-xs m-auto">
        <PrimaryButton
          label="Start New Resume"
          onClick={handleStartNewResumeClick}
        />
        {!user && <LoginOptions />}
      </div>
    </div>
  );
};

export default Home;
