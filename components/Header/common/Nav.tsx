import React from "react";

const navMenu = [{ title: "My Resumes" }, { title: "User" }];

const Nav = () => {
  return (
    <ul className="flex gap-4 ">
      {navMenu &&
        navMenu.length > 0 &&
        navMenu.map(({ title }) => (
          <button className="text-slate-800 font-semibold" key={title}>
            {title}
          </button>
        ))}
    </ul>
  );
};

export default Nav;
