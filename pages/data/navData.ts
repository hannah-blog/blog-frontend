import {blockIcon, docsIcon, drawerIcon} from "./icons";

type NavChildren = {
  title: string,
  cLink: string,
};
type NavChildrenList = NavChildren[];

type NavData = {
  mainTitle: string,
  link: string,
  icon: JSX.Element,
  children: NavChildrenList,
}
type NavDataList = NavData[];

export const navData: NavDataList = [
  {
    mainTitle: "How is Hannah?",
    link: "/introduce",
    icon: docsIcon,
    children: [
      {
        "title": "Resume",
        "cLink": "/resume",
      },
      {
        "title": "Cover Letter",
        "cLink": "/cover-letter",
      },
      {
        "title": "Contact",
        "cLink": "/contact",
      },
    ],
  },
  {
    mainTitle: "Develop Archiving",
    link: "/develop",
    icon: blockIcon,
    children: [
      {
        "title": "Blog",
        "cLink": "/blog",
      },
      {
        "title": "Series",
        "cLink": "/series",
      },
      {
        "title": "Guest Book",
        "cLink": "/guest-book",
      },
    ],
  },
  {
    mainTitle: "Daily Archiving",
    link: "/daily",
    icon: drawerIcon,
    children: [
      {
        "title": "Trip",
        "cLink": "/trip",
      },
      {
        "title": "Popular Restaurant",
        "cLink": "/popular-restaurant",
      },
    ],
  },
];
