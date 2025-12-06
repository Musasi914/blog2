export type LaboArrayProps = {
  title: string;
  description: string;
  publish: string;
  url?: string;
  github?: string;
  learn: string[];
};

const LaboArray = [
  {
    title: "3D練習場",
    description:
      "3Dポートフォリオです。こういうサイトが作りたかった！というサイトを作りました。満足です。",
    publish: "2025/10/03",
    url: "https://three-training2.vercel.app/",
    github: "https://github.com/Musasi914/three-training2",
    learn: ["Three.js", "GLSL"],
  },
  {
    title: "ポートフォリオ",
    description:
      "ポートフォリオです。こういうサイトが作りたかった！というサイトを作りました。満足です。",
    publish: "2025/10/03",
    url: "https://koh-fukuzawa.com",
    learn: ["Three.js", "Next.js", "GSAP"],
  },
  {
    title: "ハンズオンブログ",
    description:
      "著「作って学ぶ Next.js/React Webサイト構築」でハンズオン形式で作ったブログです。バニラjsで作っていたのでTypeScriptでブログ作り直すのが小さい目標地点だったので、クリアしました。",
    publish: "2024/7/13",
    url: "https://next-tutorial-xi-green.vercel.app/",
    github: "https://github.com/Musasi914/next-tutorial",
    learn: ["React", "Next.js"],
  },
  {
    title: "2ちゃん風書き込み可能サイト（閉鎖）",
    description:
      "初めてのfirebaseでいろいろ機能試しながら。mysqlの勉強ほんのちょっとしていたけど、こんなに簡単にバックエンド実装できるなんて...。と,ある意味感動やら絶望やらした思い出。",
    publish: "2024/11/16",
    github: "https://github.com/Musasi914/postableblog",
    learn: [
      "firebase-auth",
      "firebase-firestore(DB)",
      "firebase-deploy",
      "react-router-dom",
    ],
  },
  {
    title: "POP THE ROCK JACKPOT",
    description:
      "前々からランキング機能入ったミニゲームを作ってみたかった。YouTubeショートで流れてきた海外のゲーセンゲームの動画を見たときからこれ作れるんじゃねえかってうずうずしていた。",
    publish: "2024/11/23",
    url: "https://pop-the-rock-jackpot.web.app/",
    github: "https://github.com/Musasi914/pop-the-rock-jackpot",
    learn: ["firebase-匿名認証", "typescript"],
  },
  {
    title: "Tailwind CSS 練習場",
    description:
      "Tailwind CSSの練習場です。普通にやってて疑問に思った箇所の解決とか、「TailwindCSS実践入門」の感想まとめとか",
    publish: "2024/12/20くらい",
    url: "https://blog2-one-phi.vercel.app/tailwind-practice",
    learn: ["Tailwind CSS", "CSS"],
  },
  {
    title: "TypeScript 練習場",
    description:
      "TypeScript練習場。JSの復習にもなったし、よくわからずChatGPTにきいてもあやふやだったのが、ChatGPTにきいたらやっていることはわかる程度には。",
    publish: "2025/2/10",
    url: "https://blog2-one-phi.vercel.app/typescript-practice",
    learn: ["TypeScript"],
  },
];

export default LaboArray;
