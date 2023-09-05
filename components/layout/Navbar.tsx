'use client'

import { useEffect, useState } from 'react'
import {
  Avatar,
  Collapse,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  MTNavbar
} from '@/components/tailwind/client-components'
import styles from '@/styles/components/layout/navbar.module.css'
import Link from 'next/link'
import { navData } from '@/data/nav-data'
import { menuCloseIcon, menuOpenIcon } from '@/components/svg/icons'
import { logo } from '@/components/font/google'

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);

  const navbarItemClasses =
    "flex items-center px-1 py-2 font-normal transition-all duration-250 text-size-sm text-current font-light lg:px-2 cursor-pointer";

  const handleScroll = () => {
    const {pageYOffset} = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  };
  const throttleScroll = throttle(handleScroll, 50);

  useEffect(() => {
    window.addEventListener('scroll', throttleScroll);
    return () => window.removeEventListener('scroll', throttleScroll);
  }, [pageY, throttleScroll]);

  const navbarMenu = <div className="flex w-full flex-col lg:flex-row xl:ml-40">
    <ul
      className={`${open ? "mt-4" : ""} mb-0 flex list-none flex-col gap-2 pl-0 text-inherit transition-all lg:ml-auto lg:flex-row lg:gap-4`}>
      {navData.map((nav, index) => {
        return <Menu placement="bottom" offset={-2.5} key={index}>
          <MenuHandler>
            <li>
              <span className={navbarItemClasses}>
                {nav.icon}
                <span className="ml-2">{nav.mainTitle}</span>
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
    <div className={styles.navWrapper}>
      <MTNavbar className={`${hide && styles.hide} ${!hide && styles.false} py-4 pl-6 pr-2 lg:py-2.5 shadow-2xl shadow-blue-gray-500/10`}>
        <div className={styles.webNav}>
          <Link href="/" className="py-2.375 text-size-sm mr-4 whitespace-nowrap font-bold text-inherit lg:ml-0">
            <div className={styles.profileImage}>
              <Avatar alt="Hannah github profile image" src="https://avatars.githubusercontent.com/u/57277976?v=4"/>
              <h1 style={logo.style}>Hannah Blog</h1>
            </div>
          </Link>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpen(!open)}
          >
            {open ? menuCloseIcon : menuOpenIcon}
          </IconButton>
          <div className={styles.menuWrapper}>{navbarMenu}</div>
        </div>
        <Collapse open={open} className="text-[#1A237E]">
          {navbarMenu}
        </Collapse>
      </MTNavbar>
    </div>
  );
}

const throttle = (callback: any, waitTime: number) => {
  let timerId: NodeJS.Timeout | null;
  return (event: any) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback.call(this, event);
      timerId = null;
    }, waitTime);
  };
};
