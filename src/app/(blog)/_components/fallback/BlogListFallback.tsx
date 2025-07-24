import ListUnderline from "../common/List/ListUnderline";

export default function BlogListFallback() {
  return (
    <ul>
      {[...Array(20)].map((index) => (
        <ListUnderline key={index} className="animate-pulse">
          <li className="px-2 py-5 block hover:opacity-80">
            <h2 className="text-xl w-1/2 leading-none h-[1.2em] bg-slate-400"></h2>
            <p className="truncate opacity-70 md:text-sm my-2 h-[1em] bg-slate-700 mb-4"></p>
            <div className="flex gap-x-2 flex-wrap-reverse">
              <p className="leading-none h-[1em] w-10 bg-slate-600"></p>
              <p className="leading-none h-[1em] w-6 bg-slate-600"></p>
            </div>
          </li>
        </ListUnderline>
      ))}
    </ul>
  );
}
