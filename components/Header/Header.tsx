import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import headerLogo from "../../assets/headerLogo.svg";
import { setAppData, setUser } from "../../store/slices/appSlice";
import Nav from "./common/Nav";

const Header = () => {
  const dispatch = useDispatch();
  useRehydrateUser(dispatch);

  return (
    <div className="flex justify-between content-center gap-2 cursor-pointer">
      <Link href="/">
        <Image src={headerLogo} alt="ResumeFromSpace logo"></Image>
      </Link>
      <Nav />
    </div>
  );
};

const useRehydrateUser = (dispatch) => {
  useEffect(() => {
    let hasStoredUser = document?.cookie?.split("; ")?.[1]?.split("=")[1];
    if (hasStoredUser) dispatch(setUser(JSON.parse(hasStoredUser)));
  }, []);
};

export default Header;
