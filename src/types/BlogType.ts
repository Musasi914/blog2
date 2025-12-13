export type BlogCategoryType = {
  id: string;
  title: string;
};

export type BlogType = {
  id: string;
  publishedAt: string;
  title: string;
  summary?: string;
  category: BlogCategoryType[];
};

export type PagenationGetBlogType = {
  id: string;
  title: string;
  publishedAt: string;
  category: { title: string }[];
};

export type CategoryType = "memory" | "release" | "important" | "learn";
