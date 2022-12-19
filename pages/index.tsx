import type { NextPage } from "next";
import Image from "next/image";
import { TextInput } from "../components/Form/common/TextInput";
import loginLogo from "../assets/loginLogo.svg";
import { useState } from "react";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
  };
  const handleLoginClick = () => {};

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
