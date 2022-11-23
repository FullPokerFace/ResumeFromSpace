import React, { useState } from "react";

const navMenu = [{ title: "My Resumes" }, { title: "User" }];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ul className="md:flex gap-4 hidden">
        {navMenu &&
          navMenu.length > 0 &&
          navMenu.map(({ title }) => (
            <button className="text-slate-800 font-semibold" key={title}>
              {title}
            </button>
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
          navMenu.map(({ title }) => (
            <button className="text-white font-semibold min-w-max" key={title}>
              {title}
            </button>
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
