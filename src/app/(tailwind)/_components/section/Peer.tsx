import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const htmlString = `
<fieldset className="">
  <legend>Published status</legend>
  <input
    id="draft"
    className="peer/draft"
    type="radio"
    name="status"
    defaultChecked
  />
  <label htmlFor="draft" className="peer-checked/draft:text-sky-500">
    Draft
  </label>
  <input
    id="published"
    className="peer/published"
    type="radio"
    name="status"
  />
  <label
    htmlFor="published"
    className="peer-checked/published:text-sky-500"
  >
    Published
  </label>
  <div className="hidden peer-checked/draft:block">
    Drafts are only visible to administrators.
  </div>
  <div className="hidden peer-checked/published:block">
    Your post will be publicly visible on your site.
  </div>
</fieldset>
`;
export default function Peer() {
  return (
    <div className="space-y-9">
      <fieldset className="">
        <legend>Published status</legend>
        <input
          id="draft"
          className="peer/draft"
          type="radio"
          name="status"
          defaultChecked
        />
        <label htmlFor="draft" className="peer-checked/draft:text-sky-500">
          Draft
        </label>

        <input
          id="published"
          className="peer/published"
          type="radio"
          name="status"
        />
        <label
          htmlFor="published"
          className="peer-checked/published:text-sky-500"
        >
          Published
        </label>

        <div className="hidden peer-checked/draft:block">
          Drafts are only visible to administrators.
        </div>
        <div className="hidden peer-checked/published:block">
          Your post will be publicly visible on your site.
        </div>
      </fieldset>
      <SyntaxHighlighter className="text-xs" style={dark}>
        {htmlString}
      </SyntaxHighlighter>
      <div>
        <p>Groupの兄弟要素版ってだけ。記述の仕方も同じ。</p>
        <p>
          注意点としては、peer/[]で定義する前にpeer-hover/[]:[style]としても動かない
        </p>
      </div>
    </div>
  );
}
