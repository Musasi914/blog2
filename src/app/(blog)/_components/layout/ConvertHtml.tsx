import styles from "@/app/(blog)/[id]/_style/blogpost.module.css";
import { load } from "cheerio";
import hljs, { HighlightResult } from "highlight.js";
import "highlight.js/styles/github-dark.css";

const allowedTags = new Set([
  "a",
  "blockquote",
  "br",
  "code",
  "del",
  "div",
  "em",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "img",
  "li",
  "ol",
  "p",
  "pre",
  "span",
  "strong",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "ul",
]);

const allowedAttributesByTag: Record<string, Set<string>> = {
  a: new Set(["href", "target", "rel", "title"]),
  code: new Set(["class"]),
  div: new Set(["data-filename"]),
  img: new Set(["src", "alt", "title", "width", "height"]),
  td: new Set(["colspan", "rowspan"]),
  th: new Set(["colspan", "rowspan"]),
};

function getLanguageName(className: string) {
  return className
    .split(/\s+/)
    .find((name) => name.startsWith("language-"))
    ?.replace("language-", "");
}

function isSafeUrl(value: string) {
  const normalizedValue = value.trim().replace(/[\u0000-\u001F\u007F\s]+/g, "");

  if (
    normalizedValue.startsWith("/") ||
    normalizedValue.startsWith("#") ||
    normalizedValue.startsWith("./") ||
    normalizedValue.startsWith("../")
  ) {
    return true;
  }

  try {
    const url = new URL(normalizedValue);
    return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol);
  } catch {
    return false;
  }
}

function sanitizeHtml($: ReturnType<typeof load>) {
  $("script, style, iframe, object, embed, link, meta, base").remove();

  $("*").each((_, elm) => {
    const tagName = elm.tagName.toLowerCase();

    if (!allowedTags.has(tagName)) {
      $(elm).replaceWith($(elm).contents());
      return;
    }

    const allowedAttributes = allowedAttributesByTag[tagName] ?? new Set();

    for (const attribute of Object.keys(elm.attribs ?? {})) {
      const attributeName = attribute.toLowerCase();
      const attributeValue = $(elm).attr(attribute) ?? "";

      if (!allowedAttributes.has(attributeName)) {
        $(elm).removeAttr(attribute);
        continue;
      }

      if (
        ["href", "src"].includes(attributeName) &&
        !isSafeUrl(attributeValue)
      ) {
        $(elm).removeAttr(attribute);
      }
    }

    if (tagName === "a") {
      $(elm).attr("rel", "noopener noreferrer");
    }
  });
}

export default function ConvertHtml({ htmlStr }: { htmlStr: string }) {
  // APIから取得したリッチエディタのHTMLからcheerioオブジェクトを生成
  const $ = load(htmlStr);
  sanitizeHtml($);

  // コードブロックのファイル名が入力されているとき
  $("div[data-filename]").each((_, elm) => {
    const filename = $(elm).attr("data-filename");
    if (!filename) return;

    $(elm).prepend($("<span></span>").text(filename));
  });

  // コードブロックのシンタックスハイライトを行う
  $("pre code").each((_, elm) => {
    const language = getLanguageName($(elm).attr("class") || "");
    let result: HighlightResult;

    if (!language || !hljs.getLanguage(language)) {
      // 言語が入力なしの場合、自動判定
      result = hljs.highlightAuto($(elm).text());
    } else {
      // 言語が入力ありの場合、入力された言語で判定
      result = hljs.highlight($(elm).text(), {
        language,
      });
    }
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });
  htmlStr = $.html();
  return (
    <div className={styles.post} dangerouslySetInnerHTML={{ __html: htmlStr }} />
  );
}
