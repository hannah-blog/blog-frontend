import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

import {
  Navbar as MTNavbar,
  MobileNav,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

interface NavbarProps {
  container?: string;
  className?: string;
  shadow?: boolean;
  sidenavMenu?: any;
  mobileNavClassName?: string;

  [key: string]: any;
}

export default function Navbar({
   container,
   className,
   shadow,
   sidenavMenu,
   mobileNavClassName = "text-[#1A237E]",
   ...rest
 }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const navbarItemClasses =
    "flex items-center px-1 py-2 font-normal transition-all duration-250 text-size-sm text-current font-light lg:px-2 cursor-pointer";

  useEffect(() => {
    window.addEventListener("resize", () => {
      window.innerWidth >= 960 && setOpen(false);
    });
  }, []);

  const navbarMenu = (
    <div className="flex w-full flex-col lg:flex-row xl:ml-40">
      <ul className={`${ open ? "mt-4" : "" } mb-0 flex list-none flex-col gap-2 pl-0 text-inherit transition-all lg:ml-auto lg:flex-row lg:gap-4`}>
        <Menu placement="bottom" offset={-2.5}>
          <MenuHandler>
            <li>
              <span className={navbarItemClasses}>
                {docsIcon}
                <span>How is Hannah?</span>
              </span>
            </li>
          </MenuHandler>
          <MenuList>
            <MenuItem className="!p-0">
              <Link href="/docs/html/installation" className={`${navbarItemClasses} lg:px-3`}>
                Resume
              </Link>
            </MenuItem>
            <MenuItem className="!p-0">
              <Link href="/docs/react/installation" className={`${navbarItemClasses} px-3 py-2 lg:px-3`}>
                Cover Letter
              </Link>
            </MenuItem>
            <MenuItem className="!p-0">
              <Link href="/docs/react/installation" className={`${navbarItemClasses} px-3 py-2 lg:px-3`}>
                Contact
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu placement="bottom" offset={-2.5}>
          <MenuHandler>
            <li>
              <span className={navbarItemClasses}>
                {blockIcon}
                <span>Develop Archiving</span>
              </span>
            </li>
          </MenuHandler>
          <MenuList>
            <MenuItem className="!p-0">
              <Link href="/docs/html/installation" className={`${navbarItemClasses} lg:px-3`}>
                Blog
              </Link>
            </MenuItem>
            <MenuItem className="!p-0">
              <Link href="/docs/react/installation" className={`${navbarItemClasses} px-3 py-2 lg:px-3`}>
                Series
              </Link>
            </MenuItem>
            <MenuItem className="!p-0">
              <Link href="/docs/react/installation" className={`${navbarItemClasses} px-3 py-2 lg:px-3`}>
                Guest Book
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu placement="bottom" offset={-2.5}>
          <MenuHandler>
            <li>
              <span className={navbarItemClasses}>
                {drawerIcon}
                <span>Daily Archiving</span>
              </span>
            </li>
          </MenuHandler>
          <MenuList>
            <MenuItem className="!p-0">
              <Link href="/docs/html/installation" className={`${navbarItemClasses} lg:px-3`}>
                Trip
              </Link>
            </MenuItem>
            <MenuItem className="!p-0">
              <Link href="/docs/react/installation" className={`${navbarItemClasses} px-3 py-2 lg:px-3`}>
                Popular Restaurant
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </ul>
    </div>
  );

  return (
    <div
      className={`absolute left-2/4 z-[999] my-4 flex w-full max-w-screen-2xl -translate-x-2/4 flex-wrap items-center px-4 lg:fixed ${container}`}
    >
      <MTNavbar
        {...rest}
        className={`py-4 pl-6 pr-2 lg:py-2.5 ${
          shadow ? "shadow-2xl shadow-blue-gray-500/10" : ""
        }`}
        shadow={shadow}
      >
        <div className={`flex w-full items-center !justify-between text-[#1A237E] ${className}`}>
          <Link href="/" className="py-2.375 text-size-sm mr-4 whitespace-nowrap font-bold text-inherit lg:ml-0">
            <ProfileImg>
              <img alt="Hannah github profile image" src="https://avatars.githubusercontent.com/u/57277976?v=4" />
              <h1>Hannah Blog</h1>
            </ProfileImg>
          </Link>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpen(!open)}
          >
            {open ? menuCloseIcon : menuOpenIcon}
          </IconButton>
          <div className="lg:base-auto hidden flex-grow basis-full items-center overflow-hidden lg:flex lg-max:max-h-0">
            {navbarMenu}
          </div>
        </div>
        <MobileNav open={open} className={mobileNavClassName}>
          {navbarMenu}
        </MobileNav>
        {sidenavMenu}
      </MTNavbar>
    </div>
  );
}

const ProfileImg = styled.div`
  display: flex;
  h1 {
    margin-left: 1rem;
    font-size: 2rem;
    margin-top: 0.2rem;
    font-family: 'Sacramento', serif;
  }
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 0.8rem;
  }
`;

const menuOpenIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const menuCloseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="h-6 w-6"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const docsIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="mr-1.5 h-[18px] w-[18px] opacity-75"
  >
    <path
      fillRule="evenodd"
      d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z"
      clipRule="evenodd"
    />
    <path
      d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z"/>
  </svg>
);

const blockIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="mr-1.5 h-[18px] w-[18px] opacity-75"
  >
    <path
      fillRule="evenodd"
      d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z"
      clipRule="evenodd"
    />
  </svg>
);

const drawerIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="mr-1.5 h-[18px] w-[18px] text-inherit opacity-75"
  >
    <path
      d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z"/>
  </svg>
);
