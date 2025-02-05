import Button from "../clsx/Button";

export default function Library() {
  return (
    <div>
      <p>「clsx」</p>
      <Button>ぶとｎ</Button>
      <Button variant="primary">ぶとｎ</Button>
      <Button variant="secondary">ぶとｎ</Button>
      <Button variant="secondary" size="sm">
        ぶとｎ
      </Button>
      <Button variant="secondary" size="lg">
        ぶとｎ
      </Button>
    </div>
  );
}
