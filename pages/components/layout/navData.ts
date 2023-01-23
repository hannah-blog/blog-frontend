
type NavChildren = {
  title: string,
  cLink: string,
};
type NavChildrenList = NavChildren[];

type NavData = {
  mainTitle: string,
  link: string,
  children: NavChildrenList,
}
type NavDataList = NavData[];

export const navData: NavDataList = [
  {
    mainTitle: "How is Hannah?",
    link: "/introduce",
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
