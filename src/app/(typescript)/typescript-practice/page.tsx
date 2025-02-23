import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function page() {
  return (
    <div className="container w-11/12 mx-auto max-w-screen-md space-y-20 &_section:space-y-5 prose prose-invert">
      <section className="mt-8">
        <h1>TypeScript練習場</h1>
        <a href="https://www.amazon.co.jp/%E3%83%97%E3%83%AD%E3%82%92%E7%9B%AE%E6%8C%87%E3%81%99%E4%BA%BA%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AETypeScript%E5%85%A5%E9%96%80-%E5%AE%89%E5%85%A8%E3%81%AA%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9%E3%81%8B%E3%82%89%E9%AB%98%E5%BA%A6%E3%81%AA%E5%9E%8B%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9%E3%81%BE%E3%81%A7-Software-Design-plus/dp/4297127474/ref=sr_1_1_sspa?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1IZEN64CVUF8H&dib=eyJ2IjoiMSJ9.xxTXbbEd4mfcPZwHzs0RLyJUWum4_3jZFKVOLFQBt6nfZRwXZskEpQStAK5ngGkgorUs7WRwLR55UFp_urPA1BuVqqvNhhmNJGipUHtN_xYRiqo3Tqnwz1xipOEuXI8AQXRHUw6NtWsHr2LVSI9zKIWl-TS_NJkFvlyp8ApGM8-XBRIphMfuaTQXfQdPOnwkrK3MqDcjaH3nbDpA8crR4mz5FaI_fQJoLPOKKulf9J4.cRUy7C0_PwMhcv9dudeB1gbkvmvQJ6iyY5urih3Eawk&dib_tag=se&keywords=typescript&qid=1735948374&s=books&sprefix=typescri%2Cstripbooks%2C195&sr=1-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1">
          <img
            src="https://m.media-amazon.com/images/I/81DuhehbGJL._SY385_.jpg"
            alt=""
          />
          プロを目指す人のためのTypeScript入門
          安全なコードの書き方から高度な型の使い方まで (Software Design plus)
        </a>
      </section>

      <section>
        <p>TSの役割</p>
        <ol>
          <li>型チェック</li>
          <li>トランスパイル（コンパイル）</li>
        </ol>
        <p>型チェックはプログラムを実行しなくても行える静的なチェックである</p>
      </section>

      <section>
        <div>
          <h3>インデックスシグネチャ</h3>
          <SyntaxHighlighter language="typescript" style={dark}>
            {`
  type PriceData = {
    [key: string]: number;
  };
  
  const obj1:PriceData = {
    apple: 123,
    banana: 567,
  };
  
  obj1.hoge = 778;
            `}
          </SyntaxHighlighter>
        </div>
        <div>
          <h3>変数の型を取得できるtypeof</h3>
          <SyntaxHighlighter language="typescript" style={dark}>
            {`
// 型を明示されてないオブジェクトから型推論によりtypeofで型を取得する例。濫用すべきでない。
const obj = {
  a: 123,
  b: 345,
};
const obj2: typeof obj = {
  a: 234,
  b: 345435,
};
console.log(obj2);
            `}
          </SyntaxHighlighter>
        </div>
      </section>

      <section>
        <h2>型引数 - ジェネリック型</h2>
        <SyntaxHighlighter language="typescript" style={dark}>
          {`
type hasName = {
  name: string;
};

type A = {
  name: string;
};

type B = {
  name: string;
  type: number;
};

type Family<Parent extends hasName, Child extends Parent> = {
  mother: Parent;
  parent: Parent;
  child: Child;
};

const obj: Family<A, B> = {
  mother: { name: "kanon" },
  parent: { name: "foej" },
  child: { name: "ewfo", type: 2 },
};
          `}
        </SyntaxHighlighter>
      </section>

      <section>
        <h2>6章 高度な型</h2>
        <div>
          <h3>関数呼び出しのオプショナルチェイニング</h3>
          <SyntaxHighlighter language="typescript" style={dark}>
            {`
type GetTimeFunc = () => Date;

function useTime(getTimeFunc: GetTimeFunc | undefined) {
  const timeOrUndefined = getTimeFunc?.();
}
            `}
          </SyntaxHighlighter>
        </div>
        <div>
          <h3>lookup型、keyof型</h3>
          <SyntaxHighlighter language="typescript" style={dark}>
            {`
type Human = {
  name: string;
  age: number;
};

function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const uhyo: Human = {
  name: "matsuda",
  age: 2,
};

const uhyoName = get(uhyo, "name");
const uhyoAge = get(uhyo, "age");
            `}
          </SyntaxHighlighter>
        </div>
      </section>

      <section>
        <h2>8章 非同期処理</h2>
        <div>
          <h3>async await の順番をしっかり理解</h3>
          <SyntaxHighlighter language="typescript" style={dark}>
            {`
async function get3(): Promise<number> {
  console.log("get3が呼び出された");
  await sleep(1000);
  console.log("awaitの次に進んだ");
  return 3;
}

console.log("get3を呼びだし");
const p = get3();
p.then((num) => console.log(num));
console.log(".thenの後");

// get3を呼びだし;
// get3が呼び出された.thenの後;
// awaitの次に進んだ;
// 3;
            `}
          </SyntaxHighlighter>
        </div>
      </section>
    </div>
  );
}
