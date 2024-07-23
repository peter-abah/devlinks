import LinkInput from "@/components/link-input";
import { Button } from "@/components/ui/button";
import LinksEmptyImage from "@/public/images/links-empty.png";
import Image from "next/image";

export default function LinksForm() {
  return (
    <form className="bg-white grow rounded-xl stack">
      <div className="p-6 md:p-10 stack gap-6 grow">
        <header className="space-y-2">
          <h1 className="text-2xl md:text-[32px] font-bold">Customize your links</h1>
          <p className="text-gray">
            Add/edit/remove links below and then share all your profiles with the world!
          </p>
        </header>

        <div className="stack gap-6 grow">
          <Button variant="outline" className="w-full font-semibold">
            + Add new link
          </Button>

          <LinkInput linkNo={2} />
          <LinkInput linkNo={4} />
          <LinkInput linkNo={6} />
        </div>
      </div>

      <div className="py-4 px-4 md:py-6 md:px-10 flex justify-end border-t">
        <Button disabled type="submit" className="w-full md:w-auto">
          Save
        </Button>
      </div>
    </form>
  );
}

function EmptyState() {
  return (
    <div className="p-5 bg-gray-light stack justify-center items-center gap-6 md:gap-10 grow rounded-xl">
      <div className="relative h-20 md:h-40 aspect-[3/2]">
        <Image src={LinksEmptyImage} alt="" fill />
      </div>
      <div className="max-w-[488px] stack gap-6 text-center">
        <h2 className="text-2xl md:text-[32px] font-bold">Let’s get you started</h2>
        <p className="text-gray">
          Use the “Add new link” button to get started. Once you have more than one link, you can
          reorder and edit them. We’re here to help you share your profiles with everyone!
        </p>
      </div>
    </div>
  );
}
