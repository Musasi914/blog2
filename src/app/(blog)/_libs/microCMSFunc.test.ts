import assert from "node:assert/strict";
import test from "node:test";

import { buildBlogListQuery } from "./microCMSFunc";

test("buildBlogListQuery returns newest order by default", () => {
  const queryString = buildBlogListQuery(10, 0);

  assert.match(queryString, /limit=10/);
  assert.match(queryString, /offset=0/);
  assert.match(queryString, /orders=-publishedAt/);
  assert.equal(queryString.includes("q="), false);
  assert.equal(queryString.includes("filters="), false);
});

test("buildBlogListQuery applies oldest sort order", () => {
  const queryString = buildBlogListQuery(10, 0, { sort: "oldest" });

  assert.match(queryString, /orders=publishedAt/);
  assert.equal(queryString.includes("-publishedAt"), false);
});

test("buildBlogListQuery adds q parameter when query is provided", () => {
  const queryString = buildBlogListQuery(10, 0, { query: "nextjs" });

  assert.match(queryString, /q=nextjs/);
});

test("buildBlogListQuery ignores empty query", () => {
  const queryString = buildBlogListQuery(10, 0, { query: "   " });

  assert.equal(queryString.includes("q="), false);
});

test("buildBlogListQuery adds category filter", () => {
  const queryString = buildBlogListQuery(10, 0, { category: "learn" });

  assert.match(queryString, /filters=category%5Bcontains%5D6x-voqyv7x_k/);
});

test("buildBlogListQuery combines category, query, and sort", () => {
  const queryString = buildBlogListQuery(20, 40, {
    category: "memory",
    query: "typescript",
    sort: "oldest",
  });

  assert.match(queryString, /limit=20/);
  assert.match(queryString, /offset=40/);
  assert.match(queryString, /orders=publishedAt/);
  assert.match(queryString, /q=typescript/);
  assert.match(queryString, /filters=category%5Bcontains%5Dsq6jyab_dcj/);
});

test("buildBlogListQuery adds date range filter", () => {
  const queryString = buildBlogListQuery(10, 0, {
    dateFrom: "2025-04",
    dateTo: "2026-05",
  });

  assert.match(
    queryString,
    /filters=publishedAt%5Bgreater_than%5D2025-04-01%5Band%5DpublishedAt%5Bless_than%5D2026-06-01/
  );
});

test("buildBlogListQuery combines category and date range", () => {
  const queryString = buildBlogListQuery(10, 0, {
    category: "learn",
    dateFrom: "2025-04",
    dateTo: "2026-05",
    sort: "newest",
  });

  assert.match(
    queryString,
    /filters=category%5Bcontains%5D6x-voqyv7x_k%5Band%5DpublishedAt%5Bgreater_than%5D2025-04-01%5Band%5DpublishedAt%5Bless_than%5D2026-06-01/
  );
});
