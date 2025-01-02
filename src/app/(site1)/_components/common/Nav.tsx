import Button from "./Button";

export default function Nav() {
  return (
    <nav className="flex flex-col gap-4">
      <div className="md:hidden">
        <Button
          mainTitle="MENU"
          secondaryTitle="CLOSE"
          noHover={true}
          className="w-16"
        >
          MENU
        </Button>
      </div>
      <ul className="flex flex-col gap-2 w">
        <li>
          <Button as="link" href="/home" mainTitle="HOME" secondaryTitle="HOME">
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
          <Button as="link" href="/work" mainTitle="WORK" secondaryTitle="WORK">
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
  );
}
