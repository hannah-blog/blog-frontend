export type SingleNavItem = { title: string; href: string; outlined?: boolean };

export type NavItems = SingleNavItem[];

export type DetailItem = { title: string; href: string }

export type SingleCustomNavItem = { title: string; href: string; items: DetailItem[] };

export type CustomNavItems = SingleCustomNavItem[];

export type SingleArticle = {
  slug: string;
  content: string;
  meta: {
    title: string;
    description: string;
    date: string;
    tags: string;
    imageUrl: string;
  };
};

export type NonNullableChildren<T> = { [P in keyof T]: Required<NonNullable<T[P]>> };

export type NonNullableChildrenDeep<T> = {
  [P in keyof T]-?: NonNullableChildrenDeep<NonNullable<T[P]>>;
};
