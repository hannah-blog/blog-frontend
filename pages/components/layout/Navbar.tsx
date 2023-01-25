import {useState, useEffect} from "react";
import Link from "next/link";
import styled from "styled-components";

import {
  Navbar as MTNavbar,
  MobileNav,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem, Avatar,
} from "@material-tailwind/react";
import {navData} from "../../data/navData";

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

  const navbarMenu = <div className="flex w-full flex-col lg:flex-row xl:ml-40">
    <ul className={`${open ? "mt-4" : ""} mb-0 flex list-none flex-col gap-2 pl-0 text-inherit transition-all lg:ml-auto lg:flex-row lg:gap-4`}>
      { navData.map((nav, index) => {
        return <Menu placement="bottom" offset={-2.5} key={index}>
          <MenuHandler>
            <li>
              <span className={navbarItemClasses}>
                {nav.icon}
                <span>{nav.mainTitle}</span>
              </span>
            </li>
          </MenuHandler>
          <MenuList>
            {nav.children.map((cNav, index) => {
              return <MenuItem className="!p-0" key={index}>
                <Link href={`${nav.link}${cNav.cLink}`} className={`${navbarItemClasses} lg:px-3`}>
                  {cNav.title}
                </Link>
              </MenuItem>;
            })}
          </MenuList>
        </Menu>;
      })}
    </ul>
  </div>;

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
              <Avatar alt="Hannah github profile image" src="https://avatars.githubusercontent.com/u/57277976?v=4"/>
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
