import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getAppState } from "../../../store/slices/appSlice";
import Link from "next/link";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user } = useSelector(getAppState);

  const navMenu = [
    { title: "Create", link: "/create" },
    { title: "My Resumes", link: "/myresumes" },
  ];

  if ((user as any)?.email)
    navMenu.push({ title: (user as any)?.email, link: "/user" });

  const isThisPage = (link: string) => router?.pathname === link;
  return (
    <>
      <ul className="md:flex gap-4 hidden items-center">
        {navMenu &&
          navMenu.length > 0 &&
          navMenu.map(({ title, link }) => (
            <Link
              key={link}
              href={link}
              className={`text-slate-800 font-semibold border-b-2 ${
                isThisPage(link) ? "border-slate-800" : "border-transparent"
              } hover:border-slate-800`}
            >
              {title}
            </Link>
          ))}
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
