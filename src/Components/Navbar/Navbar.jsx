'use client';
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Menu from "../../../public/menu.svg";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "News", url: "/News" },
  { id: 3, title: "Finance", url: "/Finance" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const ToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="h-full flex bg-blue-500 justify-between items-center md:px-6 py-4 ">
      <Link href="/" className="font-bold text-white text-2xl">
        ActiveNews
      </Link>


      <div className="block md:hidden">
        <Image
          src={Menu}
          alt="menu"
          width={24}
          height={24}
          onClick={ToggleMenu}
          className="cursor-pointer mr-2"
        />
      </div>

     
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute z-10 top-0 left-0 w-full bg-white shadow-md md:flex md:static md:w-auto md:bg-transparent md:shadow-none items-center gap-5`}
      >
  
        {menuOpen && (
          <button
            onClick={ToggleMenu}
            className="absolute top-2 right-4 text-black md:hidden"
          >
            ✕
          </button>
        )}
       
        {links.map((link) => (
          <Link
            href={link.url}
            key={link.id}
            onClick={ToggleMenu}
            className="block px-4 py-2 no-underline text-black md:text-white hover:text-gray-500 md:hover:text-gray-700 md:inline"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

