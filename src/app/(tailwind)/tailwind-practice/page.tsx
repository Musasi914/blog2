import Peer from "../_components/section/Peer";
import Group from "../_components/section/Group";
import BeforeAfter from "../_components/section/BeforeAfter";
import Library from "../_components/section/Library";

export default function page() {
  return (
    <div className="container w-11/12 mx-auto max-w-screen-md space-y-40 &_section:space-y-5">
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
    </div>
  );
}
