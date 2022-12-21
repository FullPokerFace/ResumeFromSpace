import Image from "next/image";
import Link from "next/link";
import React from "react";
import headerLogo from "../../assets/headerLogo.svg";
import Nav from "./common/Nav";

const Header = () => {
  return (
    <div className="flex justify-between content-center gap-2 cursor-pointer">
      <Link href="/">
        <Image src={headerLogo} alt="ResumeFromSpace logo"></Image>
      </Link>
      <Nav />
    </div>
  );
};

export default Header;
