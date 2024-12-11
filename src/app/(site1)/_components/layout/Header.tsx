import Link from "next/link";
import Button from "../common/Button";

export default function Header() {
  return (
    <header className="fixed z-10 w-full">
      <div className="flex justify-between w-11/12 mx-auto max-w-screen-lg">
        <nav className="">
          <div className="md:hidden">
            <Button mainTitle="MENU" secondaryTitle="OPEN">
              MENU
            </Button>
          </div>
          <ul>
            <li>
              <Button
                as="link"
                href="/home"
                mainTitle="HOME"
                secondaryTitle="HOME"
              >
                HOME
              </Button>
            </li>
            <li>
              <Button
                as="link"
                href="/about"
                mainTitle="ABOUT"
                secondaryTitle="ABOUT"
              >
                ABOUT
              </Button>
            </li>
            <li>
              <Button
                as="link"
                href="/work"
                mainTitle="WORK"
                secondaryTitle="WORK"
              >
                WORK
              </Button>
            </li>
            <li>
              <Button
                as="link"
                href="/contact"
                mainTitle="CONTACT"
                secondaryTitle="CONTACT"
              >
                CONTACT
              </Button>
            </li>
            <li>
              <Button mainTitle="REEL" secondaryTitle="PLAY">
                REEL
              </Button>
            </li>
            <li>
              <Button mainTitle="番号" secondaryTitle="番目">
                番号
              </Button>
            </li>
          </ul>
        </nav>
        <p className="font-black text-2xl">Logo</p>
      </div>
    </header>
  );
}
