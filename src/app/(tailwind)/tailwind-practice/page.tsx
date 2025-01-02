import Peer from "../_components/section/Peer";
import Group from "../_components/section/Group";
import BeforeAfter from "../_components/section/BeforeAfter";
import Library from "../_components/section/Library";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function page() {
  return (
    <div className="container w-11/12 mx-auto max-w-screen-md space-y-20 &_section:space-y-5 prose prose-invert">
      <section className="">
        <h2 className="text-3xl mt-8">バリアント修飾子「Group」</h2>
        <Group />
      </section>

      <section>
        <h2 className="text-3xl mt-8">兄弟状態に基づくスタイル設定</h2>
        <Peer />
      </section>

      <section>
        <h2 className="text-3xl mt-8">疑似要素</h2>
        <BeforeAfter />
      </section>

      <section>
        <h2 className="text-3xl mt-8">便利ライブラリ</h2>
        <Library />
      </section>

      <section>
        <h2>2025/1/1</h2>
        <p>
          以下、
          <a
            href="https://www.amazon.co.jp/Tailwind-CSS%E5%AE%9F%E8%B7%B5%E5%85%A5%E9%96%80-%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E9%81%B8%E6%9B%B8-%E5%B7%A5%E8%97%A4-%E6%99%BA%E7%A5%A5/dp/429713943X/ref=sr_1_1?crid=1UQY7X7XVLAL4&dib=eyJ2IjoiMSJ9.3yNP2f8JAG8RE8VH8toOj41k4SgRaO7x51jefgCbRoM-sOpyMKFoKbDJwcYr_20pMNUSbAPdakDAX51mNAyo6GORhkMZDimEJvhc1RVGeNNQ8xy7Qe50uQPNPmhhhXQOxsRsLbtoh9Vum5C-gI9wkwosRTfrUxkvN45M677CQ52cT2vi8zCIEpbe6AgLeexGPiEFP6lLOvFBSCA-X8085ecikA-q-qgEjgOdBCLLU8YOBs9D33V_JbWL0k4Ei_ZW6Y-LD7jGjH-_NrJDUC9bnYY84Lh1J7Rt_f900sc8lNbvMf0H_EzRq9bt7z8dwwiKRAAQgFeTEeHzW6xIS43dy3SI4jq-Km3u9KfSbp0SAjtIOdWD5WwMJyCv7keHlam2yh6UhzIGTkVjC38xqQqaaeBAr6DTY2EEUjHSeS-DwKIBwHQhmtaKqR47omTGhZiS.AqMhDtewwFn27o4thQyEP3YQBt5gfTLompRogN6ggxc&dib_tag=se&keywords=tailwind&qid=1735716463&sprefix=%2Caps%2C204&sr=8-1"
            target="_blank"
            rel="noopener"
          >
            <img
              src="https://m.media-amazon.com/images/I/71dPua3hlvL._SY342_.jpg"
              alt=""
            />
            Tailwind CSS 実践入門をよんでます
          </a>
        </p>
      </section>

      <section>
        <h2 className="text-2xl">ユーティリティファーストについて</h2>
        <div>
          <p>メリット</p>
          <ul>
            <li>クラス名を考える必要なし</li>
            <li>HTMLとCSSを交互に見る必要がない</li>
            <li>影響範囲が明確</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-2xl">プラグイン</h2>
          <dl>
            <dt>Typography</dt>
            <dd>親に「.prose」である程度スタイリングしてくれる</dd>
          </dl>
          <dl>
            <dt>Forms</dt>
            <dd>ある程度のフォームの見た目を提供</dd>
          </dl>
          <dl>
            <dt>Container Queries</dt>
            <dd>コンテナクエリが簡単に使えるように</dd>
          </dl>
        </div>
        <div>
          <p>
            Tailwindにはいくつものプラグインが組み込まれている。ユーティリティクラスはプラグインによって実装されている
          </p>
          <p>最初から組み込まれているものをコアプラグインと呼ぶ</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl">ディレクティブ</h2>
        <p>Tailwindが独自で定義しているCSS記法のうち、アットルールを指す</p>
        <dl>
          <dt>@layer</dt>
          <dd>
            @layer componentsは、スタイルを名前空間にまとめるためのものです。
            <SyntaxHighlighter language="css" className="text-xs" style={dark}>
              {`
...
@tailwind utilities;

@layer components {
  .super-button{}
                }
                `}
            </SyntaxHighlighter>
            もちろん↓のようにもかける
            <SyntaxHighlighter language="css" className="text-xs" style={dark}>
              {`
.super-button {}
                `}
            </SyntaxHighlighter>
            <p>
              利点は
              <br />
              1,utilitiesの前に書かれたことになり、上書きできる
              <br />
              2,モディファイアを利用できる　例）md:super-button
            </p>
          </dd>
        </dl>
        <dl>
          <dt>@apply</dt>
          <dd>
            <p>
              非推奨。故に詳しく書かないが、どうしてもコアプラグインスタイルでコンポーネントを追加したい場合
            </p>
            <SyntaxHighlighter language="js" className="text-xs" style={dark}>
              {`
const plugin = require('tailwindcss/plugin')

module.exports = {
  // ...
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.card': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.xl'),
        }
      })
    })
  ]
}
              `}
            </SyntaxHighlighter>
          </dd>
        </dl>
        <dl>
          <dt>@config</dt>
          <dd>
            <p>
              設定ファイルをプロジェクト内に複数設置する場合　
              <a href="https://tailwindcss.com/docs/functions-and-directives#config">
                公式参照
              </a>
            </p>
          </dd>
        </dl>
        <dl>
          <dt>theme()やscreen()</dt>
          <dd>
            <SyntaxHighlighter className="text-xs" style={dark}>
              {`
.btn-blue {
  background-color: theme(colors.blue.500);
  @media screen(sm) {
    background-color: theme(colors.red.500);
  }
}
              `}
            </SyntaxHighlighter>
          </dd>
        </dl>
      </section>

      <section>
        <h2>Preflight</h2>
        <p>
          Tailwindにおいてクラスを用いずに表現されるスタイル郡。リセットCSS的なやつ。
        </p>
      </section>

      <section>
        <h2>ダークモード対応</h2>
        <ol>
          <li>osの設定に準じる(prefers-color-scheme)(darkMode: 'media')</li>
          <li>セレクタやクラスを元に判断する(darkMode: 'selector')</li>
        </ol>
      </section>

      <section>
        <h2>組み方</h2>
        <p>classNames clsx でpropsにclassNameを渡すのは微妙</p>
        <p>あとから上書きされたりするのが面倒</p>
        <p>どうしてもというときはtailwind-mergeを使う</p>
        <h3>コンポーネント集</h3>
        <ul>
          <li>TailwindUI</li>
          <li>shadcn/ui (tailwind css + Radix UI)</li>
          <li>Headless UI (スタイリングを持たないUIライブラリ)</li>
          <li>Radix UI</li>
        </ul>
      </section>

      <section>
        <h2>設定ファイルの高度な設定</h2>
        <dl>
          <dt>safelist</dt>
          <dd>ビルド結果に強制的に含まれるクラスを指定</dd>
        </dl>
        <dl>
          <dt>blocklist</dt>
          <dd>safelistと逆に消すべきクラスを定義</dd>
        </dl>
        <dl>
          <dt>prefix</dt>
          <dd>接頭辞を指定できる</dd>
        </dl>
        <dl>
          <dt>presets</dt>
          <dd></dd>
        </dl>
      </section>
    </div>
  );
}
