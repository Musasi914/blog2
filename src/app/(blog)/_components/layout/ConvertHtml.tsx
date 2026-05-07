import styles from "@/app/(blog)/[id]/_style/blogpost.module.css";
import { load } from "cheerio";
import hljs, { HighlightResult } from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { sanitizeBlogHtml } from "@/app/(blog)/_libs/sanitizeBlogHtml";

function getLanguageName(className: string) {
  return className
    .split(/\s+/)
    .find((name) => name.startsWith("language-"))
    ?.replace("language-", "");
}

export default function ConvertHtml({ htmlStr }: { htmlStr: string }) {
  // APIから取得したリッチエディタのHTMLからcheerioオブジェクトを生成
  const $ = load(sanitizeBlogHtml(htmlStr), undefined, false);

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
