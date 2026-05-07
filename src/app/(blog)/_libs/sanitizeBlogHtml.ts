import { load } from "cheerio";

const allowedTags = new Set([
  "a",
  "b",
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
  "u",
  "ul",
]);

const globalAllowedAttributes = new Set(["class"]);

const tagAllowedAttributes: Record<string, ReadonlySet<string>> = {
  a: new Set(["href", "rel", "target", "title"]),
  div: new Set(["data-filename"]),
  img: new Set(["alt", "decoding", "height", "loading", "src", "width"]),
  td: new Set(["colspan", "rowspan"]),
  th: new Set(["colspan", "rowspan", "scope"]),
};

const urlAttributes = new Set(["href", "src"]);

function isAllowedAttribute(tagName: string, attributeName: string) {
  return (
    globalAllowedAttributes.has(attributeName) ||
    tagAllowedAttributes[tagName]?.has(attributeName) === true
  );
}

function isSafeUrl(attributeName: string, value: string) {
  const trimmedValue = value.trim();
  if (!trimmedValue) return false;

  try {
    const url = new URL(trimmedValue, "https://example.com");

    if (attributeName === "href") {
      return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol);
    }

    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

export function sanitizeBlogHtml(htmlStr: string) {
  const $ = load(htmlStr, undefined, false);

  $(
    "base, button, embed, form, frame, frameset, iframe, input, link, meta, object, option, script, select, style, textarea"
  ).remove();

  $("*").each((_, elm) => {
    const element = elm as typeof elm & {
      attribs?: Record<string, string>;
      tagName: string;
    };
    const tagName = element.tagName.toLowerCase();

    if (!allowedTags.has(tagName)) {
      $(elm).replaceWith($(elm).contents());
      return;
    }

    Object.keys(element.attribs ?? {}).forEach((attributeName) => {
      const normalizedAttributeName = attributeName.toLowerCase();
      const value = element.attribs?.[attributeName] ?? "";

      if (
        normalizedAttributeName.startsWith("on") ||
        !isAllowedAttribute(tagName, normalizedAttributeName) ||
        (urlAttributes.has(normalizedAttributeName) &&
          !isSafeUrl(normalizedAttributeName, value))
      ) {
        $(elm).removeAttr(attributeName);
      }
    });

    if (tagName === "a" && $(elm).attr("target") === "_blank") {
      $(elm).attr("rel", "noopener noreferrer");
    }

    if (tagName === "img" && !$(elm).attr("src")) {
      $(elm).remove();
    }
  });

  return $.root().html() ?? "";
}
