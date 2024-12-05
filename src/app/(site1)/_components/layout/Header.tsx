import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="">
        <div>
          <button>Menu</button>
        </div>
        <ul>
          <li>
            <Link href="/home">HOME</Link>
          </li>
          <li>
            <Link href="/home">ABOUT</Link>
          </li>
          <li>
            <Link href="/home">WORK</Link>
          </li>
          <li>
            <Link href="/home">CONTACT</Link>
          </li>
        </ul>
      </nav>
      <p>Logo</p>
    </header>
  );
}
