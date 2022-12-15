import Image from "next/image";
import React from "react";
import headerLogo from "./assets/headerLogo.svg";
import Nav from "./common/Nav";

const Header = () => {
  return (
    <div className="flex justify-between content-center gap-2">
      <a href="/">
        <Image src={headerLogo} alt="ResumeFromSpace logo"></Image>
      </a>
      <Nav />
    </div>
  );
};

export default Header;
