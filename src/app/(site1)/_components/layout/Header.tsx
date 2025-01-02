import Link from "next/link";
import Button from "../common/Button";
import Logo from "../common/Logo";
import Nav from "../common/Nav";

export default function Header() {
  return (
    <>
      <header className="fixed z-10 w-full top-4">
        <div className="justify-between w-11/12 mx-auto max-w-screen-lg ">
          <Nav />
        </div>
      </header>
      <Logo />
    </>
  );
}
