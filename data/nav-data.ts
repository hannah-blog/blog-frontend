import { blockIcon, docsIcon, drawerIcon } from '@/components/svg/icons'

type NavChildren = {
  title: string,
  cLink: string,
};

type NavData = {
  mainTitle: string,
  link: string,
  icon: JSX.Element,
  children: NavChildren[],
}

export const navData: NavData[] = [
  {
    mainTitle: "How is ChaeMin?",
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
        "cLink": "/blogs",
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
