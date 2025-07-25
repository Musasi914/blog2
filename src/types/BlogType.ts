export type BlogCategoryType = {
  id: string;
  title: string;
};

export type BlogType = {
  id: string;
  publishedAt: string;
  title: string;
  summary: string;
  category: BlogCategoryType[];
};

export type CategoryType = "memory" | "release" | "important" | "learn";
