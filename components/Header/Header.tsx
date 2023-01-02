import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import headerLogo from "../../assets/headerLogo.svg";
import { setAppData, setUser } from "../../store/slices/appSlice";
import { getSavedCookieValue } from "../ResumePreview/utils/_commonUtils";
import Nav from "./common/Nav";

const Header = () => {
  const dispatch = useDispatch();
  useRehydrateUser(dispatch);

  return (
    <div className="flex justify-between content-center gap-2 cursor-pointer">
      <Link href="/" passHref>
        <div>
          <Image src={headerLogo} alt="ResumeFromSpace logo"></Image>
        </div>
      </Link>
      <Nav />
    </div>
  );
};

const useRehydrateUser = (dispatch) => {
  useEffect(() => {
    let hasStoredUser = getSavedCookieValue("user");
    if (hasStoredUser) dispatch(setUser(JSON.parse(hasStoredUser)));
  }, []);
};

export default Header;
