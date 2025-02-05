import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const codeString = `
<div className="space-y-4">
  <div className="bg-white shadow-sm rounded-sm border border-slate-200 p-4 group/card">
    <div className="flex gap-2">
      <div>タスク1</div>
      <div className="group/actions">
        <a
          href="#"
          className="opacity-0 text-slate-500 group-hover/card:opacity-75 group-hover/actions:text-indigo-700 group-hover/actions:underline"
        >
          編集する
        </a>
      </div>
    </div>
  </div>
</div>
`;
export default function Group() {
  return (
    <div>
      <div>groupなるもの</div>
      <p className="my-4">実装例↓</p>
      <div className="space-y-4">
        <div className="bg-white shadow-sm rounded-sm border border-slate-200 p-4 group/card">
          <div className="flex gap-2">
            <div className="peer-hover/opan:opacity-10">タスク1</div>
            <div className="group/actions peer/opan">
              <a
                href="#"
                className="opacity-0 text-slate-500 group-hover/card:opacity-75 group-hover/actions:text-indigo-700 group-hover/actions:underline"
              >
                編集する
              </a>
            </div>
          </div>
        </div>
      </div>
      <p>コード↓</p>
      <SyntaxHighlighter language="html" className="text-xs" style={dark}>
        {codeString}
      </SyntaxHighlighter>
      <p>group/card がセット、　group-hover/card:[スタイリング]で可能</p>
      <p>jsいらずで色々できそうか</p>
    </div>
  );
}
