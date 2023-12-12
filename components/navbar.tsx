import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import NavbarItem from "./navbarItem";
import MobileMenu from "./mobileMenu";
import AccountMenu from "./accountMenu";

const TOP_OFFSET = 66;

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const showBg = window.scrollY >= TOP_OFFSET;
      setShowBackground(showBg);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`
    px-4
    pd:px-16
    py-6
    flex
    item-center
    transition
    duration-500
    ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""} 
    `}
      >
        <Image
          className="h-4 lg:h-7"
          src="/images/logo.png"
          alt="Logo"
          width={100}
          height={100}
        />
        <div
          className="
        flex-row
        ml-8
        gap-7
        hidden
        lg:flex
        "
        >
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Films" />
          <NavbarItem label="Browse by language" />
        </div>
        <div
          onClick={() => setShowMobileMenu((prevShow) => !prevShow)}
          className="lg:hidden flex items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell />
          </div>
          <div
            onClick={() => setShowAccountMenu((prevShow) => !prevShow)}
            className="flex items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <Image
                src="/images/default-blue.png"
                alt=""
                width={100}
                height={100}
              />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
