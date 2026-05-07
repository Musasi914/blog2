import assert from "node:assert/strict";
import test from "node:test";

import { sanitizeBlogHtml } from "./sanitizeBlogHtml";

test("removes executable blog HTML while preserving safe rich text", () => {
  const sanitizedHtml = sanitizeBlogHtml(`
    <h2 onclick="alert(1)">Title</h2>
    <script>alert("xss")</script>
    <p><a href="javascript:alert(1)" target="_blank">bad link</a></p>
    <p><a href="https://example.com" target="_blank">good link</a></p>
    <img src="data:image/svg+xml;base64,PHN2ZyBvbmxvYWQ9YWxlcnQoMSk+" alt="bad image">
    <img src="/safe.png" onerror="alert(1)" alt="safe image">
    <iframe src="https://example.com"></iframe>
    <div data-filename="sample.ts"><pre><code class="language-ts">const ok = true;</code></pre></div>
  `);

  assert.equal(sanitizedHtml.includes("<script"), false);
  assert.equal(sanitizedHtml.includes("<iframe"), false);
  assert.equal(sanitizedHtml.includes("onclick"), false);
  assert.equal(sanitizedHtml.includes("onerror"), false);
  assert.equal(sanitizedHtml.includes("javascript:"), false);
  assert.equal(sanitizedHtml.includes("data:image"), false);
  assert.match(sanitizedHtml, /<a>bad link<\/a>/);
  assert.match(
    sanitizedHtml,
    /<a href="https:\/\/example\.com" target="_blank" rel="noopener noreferrer">good link<\/a>/
  );
  assert.match(sanitizedHtml, /<img src="\/safe\.png" alt="safe image">/);
  assert.match(sanitizedHtml, /<div data-filename="sample\.ts">/);
  assert.match(sanitizedHtml, /<code class="language-ts">const ok = true;<\/code>/);
});
