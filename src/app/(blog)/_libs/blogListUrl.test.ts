import assert from "node:assert/strict";
import test from "node:test";

import {
  BLOG_MONTH_MIN,
  clampBlogMonth,
  isSelectableBlogMonth,
} from "./blogListUrl";

test("BLOG_MONTH_MIN is 2024-11", () => {
  assert.equal(BLOG_MONTH_MIN, "2024-11");
});

test("clampBlogMonth rejects months before 2024-11", () => {
  assert.equal(clampBlogMonth("2024-10"), "");
  assert.equal(clampBlogMonth("2023-12"), "");
});

test("clampBlogMonth accepts months from 2024-11 onward within max", () => {
  assert.equal(clampBlogMonth("2024-11"), "2024-11");
  assert.equal(isSelectableBlogMonth("2024-11"), true);
});

test("clampBlogMonth rejects invalid format", () => {
  assert.equal(clampBlogMonth("invalid"), "");
  assert.equal(clampBlogMonth(""), "");
});
