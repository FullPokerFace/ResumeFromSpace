import React, { useState } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppState,
  setActivePageTitle,
  setUser,
} from "../../../store/slices/appSlice";
import { deleteCookie } from "../../ResumePreview/utils/_commonUtils";

interface SigleMenu {
  title: string;
  link: string;
  actionBeforeNavigating?: Function;
}

type NavMenu = SigleMenu[];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, resumeId, activePageTitle } = useSelector(getAppState);

  const dispatch = useDispatch();

  const navMenu: NavMenu = [{ title: "Create New", link: "/selectdesign" }];

  if ((user as any)?.email)
    navMenu.push(
      { title: "My Resumes", link: "/myresumes" },
      {
        title: `Logout (${(user as any)?.email})`,
        link: "/",
        actionBeforeNavigating() {
          deleteCookie("user");
          dispatch(setUser(null));
        },
      }
    );

  if (resumeId) {
    navMenu.unshift({ title: "Work on last draft", link: "/create" });
  }

  return (
    <>
      <ul className="md:flex gap-4 hidden items-center">
        {navMenu &&
          navMenu.length > 0 &&
          navMenu.map(
            ({ title, link, actionBeforeNavigating = () => {} }, index) => (
              <button
                onClick={() => {
                  dispatch(setActivePageTitle(String(title)));
                  if (actionBeforeNavigating) actionBeforeNavigating();
                  Router.push(link);
                }}
                key={title}
                className={`text-slate-800 font-semibold border-b-2 ${
                  activePageTitle === title
                    ? "border-slate-800"
                    : "border-transparent"
                } hover:border-slate-800 transition-all`}
              >
                {title}
              </button>
            )
          )}
      </ul>
      <button className="md:hidden" onClick={() => setIsOpen(true)}>
        {burgerMenuIcon}
      </button>
      <ul
        className={` transition-all duration-200 fixed flex flex-col gap-4 md:hidden bg-slate-800 left-0 w-full h-full z-40 p-4 ${
          isOpen ? "top-0" : "-top-full"
        }`}
      >
        <button
          className="flex justify-end text-white"
          onClick={() => setIsOpen(false)}
        >
          {closeMenuIcon}
        </button>
        {navMenu &&
          navMenu.length > 0 &&
          navMenu.map(({ title, link }) => (
            <a
              href={link}
              className="text-white font-semibold min-w-max"
              key={title}
            >
              {title}
            </a>
          ))}
      </ul>
    </>
  );
};

const burgerMenuIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
    />
  </svg>
);

const closeMenuIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default Nav;
