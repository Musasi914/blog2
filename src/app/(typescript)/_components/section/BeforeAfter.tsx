export default function BeforeAfter() {
  return (
    <div className="space-y-6">
      <div>
        <p>その１　before after</p>
        <label className="block">
          <span className="block after:content-['*'] after:ml-0.5 after:text-red-500">
            Email
          </span>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="rounded-md p-2 placeholder:text-slate-400 border border-red-300 border- shadow-sm focus:outline-none focus:border-sky-500 focus:ring-red-500 focus:ring-2 w-full max-w-52"
          />
        </label>
        <p>学び　ringってoutlineのことっぽい</p>
      </div>

      <div>
        <p>その２　content</p>
        <blockquote>
          when you look
          <span className="before:block before:absolute before:-inset-1 before:bg-pink-600 relative inline-block">
            <span className="text-white relative"> annoyed </span>
          </span>
          all the time, people think that you're busy.
        </blockquote>
        <blockquote>
          when you look
          <span className="relative">
            <span className="absolute block bg-pink-500"></span>
            <span className="text-white relative"> annoyed </span>
          </span>
          all the time, people think that you're busy.
        </blockquote>
        <p>
          ↑疑似要素じゃなくて、空要素で装飾したほうがいいんじゃね？って公式がいってる
        </p>
      </div>
    </div>
  );
}
