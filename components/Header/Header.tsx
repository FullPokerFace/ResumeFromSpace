import Image from "next/image";
import Router from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import headerLogo from "../../assets/headerLogo.svg";
import {
  setActivePageTitle,
  setAppData,
  setUser,
} from "../../store/slices/appSlice";
import { getSavedCookieValue } from "../ResumePreview/utils/_commonUtils";
import Nav from "./common/Nav";

const Header = () => {
  const dispatch = useDispatch();
  useRehydrateUser(dispatch);

  function handleLogoClick() {
    Router.push("/");
    dispatch(setActivePageTitle(null));
  }

  return (
    <div className="flex justify-between content-center gap-2 cursor-pointer">
      <button onClick={handleLogoClick}>
        <div>
          <Image src={headerLogo} alt="ResumeFromSpace logo"></Image>
        </div>
      </button>
      <Nav />
    </div>
  );
};

const useRehydrateUser = (dispatch) => {
  useEffect(() => {
    let hasStoredUser = getSavedCookieValue("user");
    if (hasStoredUser)
      dispatch(
        setUser({
          ...JSON.parse(hasStoredUser),
          isLoggedIn: true,
        })
      );
  }, []);
};

export default Header;
