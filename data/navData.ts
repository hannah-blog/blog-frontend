import { blockIcon, docsIcon, drawerIcon } from "../components/styles/iconComponents";

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
        "title": "Profile",
        "cLink": "/profile",
      },
      {
        "title": "Contact",
        "cLink": "/contact",
      },
      {
        "title": "Guest Book",
        "cLink": "/guest-book",
      },
    ],
  },
  {
    mainTitle: "Archiving Develop",
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
    ],
  },
  {
    mainTitle: "Archiving Daily",
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
