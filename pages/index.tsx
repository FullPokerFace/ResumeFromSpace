import type { NextPage } from "next";
import Image from "next/image";
import { TextInput } from "../components/Form/common/TextInput";
import loginLogo from "../assets/loginLogo.svg";
import { useState } from "react";
import Router from "next/router";
import { setError } from "../store/slices/appSlice";
import { useDispatch } from "react-redux";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
  };
  const handleLoginClick = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, pass }),
    };
    try {
      const response = await fetch("/login", options);
      if (response.ok) {
        Router.push("/create");
      } else {
        dispatch(setError({ message: "User not found" }));
      }
    } catch (error) {
      dispatch(setError({ message: "Server error" }));
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center m-auto">
      <div className="w-full flex justify-center md:justify-end">
        <Image src={loginLogo} alt="Login"></Image>
      </div>
      <div className="p-8 flex flex-col justify-center gap-4 w-full max-w-xs m-auto">
        <TextInput value={email} title="Email" onChange={handleEmailChange} />
        <TextInput value={pass} title="Password" onChange={handlePassChange} />
        <button
          onClick={handleLoginClick}
          className="bg-slate-800 px-4 py-2 rounded-md text-white relative hover:bg-slate-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
