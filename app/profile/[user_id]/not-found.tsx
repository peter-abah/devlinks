import Link from "next/link";

export default async function Notfound() {
  return (
    <div className="min-h-screen relative w-full max-w-screen-2xl mx-auto bg-white md:bg-transparent">
      <div className="hidden md:block p-6 w-full absolute 2xl:w-screen 2xl:fixed top-0 left-0 h-[357px] bg-primary rounded-b-[32px] -z-10"></div>

      <div className="md:shadow-xl md:py-12 mx-auto max-w-[349px] my-[60px] md:my-[108px] min-h-[500px] rounded-3xl px-14 bg-white stack gap-14">
        <div className="stack items-center">
          <div className="w-[112px] border-4 border-primary shrink-0 mb-[25px] aspect-square rounded-full relative bg-no-preview overflow-hidden"></div>

          <p className="text-[32px] mb-4 font-bold text-center">User not found</p>
          <Link href="/" className="text-primary text-lg hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
