"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen relative w-full max-w-screen-2xl mx-auto bg-white md:bg-transparent">
      <div className="md:shadow-xl stack gap-4 md:py-12 mx-auto max-w-screen-sm my-[60px] md:my-[108px] min-h-[500px] rounded-3xl px-14 bg-white text-center">
        <h1 className="text-[2rem] font-bold">Something went wrong</h1>
        <button onClick={() => reset()} className="text-xl text-primary hover:underline">
          Try again
        </button>
      </div>
    </div>
  );
}
