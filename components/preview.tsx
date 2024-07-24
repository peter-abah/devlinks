"use client";

import PlatformIcon from "@/components/icons/platform-icons";
import { Tables } from "@/lib/types/supabase";
import { PLATFORM_COLORS, padArray, titleCase } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  links: Tables<"links">[];
  profile?: Tables<"profiles"> & { profilePicture: { url: string; name: string } };
}
export default function Preview({ links, profile }: Props) {
  const linksToUse = padArray(links || [], 3);
  const picture = profile?.profilePicture;

  const name = [profile?.first_name, profile?.last_name].join(" ");

  return (
    <div className="md:shadow-xl md:py-12 mx-auto max-w-[349px] my-[60px] md:my-[108px] min-h-[500px] rounded-3xl px-14 bg-white stack gap-14">
      <div className="stack items-center">
        <div className="w-[112px] border-4 border-primary shrink-0 mb-[25px] aspect-square rounded-full relative bg-no-preview overflow-hidden">
          {picture?.url && (
            <Image src={picture.url} fill alt={profile?.first_name || picture.name || ""} />
          )}
        </div>

        <p className="text-[32px] mb-2 font-bold">{name || "No name"}</p>
        <p className="text-gray">{profile?.email || "no email"}</p>
      </div>

      <ul className="stack gap-5 w-full">
        {linksToUse.map((link) =>
          link ? (
            <Link
              href={link.url}
              className="w-full rounded-lg p-4 flex items-center gap-2 text-white"
              style={{ backgroundColor: PLATFORM_COLORS[link.platform] }}
            >
              <PlatformIcon name={link.platform} color="white" />
              <span className="grow text-xs">{titleCase(link.platform)}</span>
              <ArrowRight size={16} />
            </Link>
          ) : (
            <div className="rounded-lg w-full bg-gray-light h-14" aria-hidden></div>
          )
        )}
      </ul>
    </div>
  );
}
