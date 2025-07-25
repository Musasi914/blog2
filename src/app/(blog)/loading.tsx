import Spinner from "./_components/common/Spinner/Spinner";

export default function Loading() {
  return (
    <div className="fixed z-50 inset-0 grid place-items-center">
      <Spinner />
    </div>
  );
}
