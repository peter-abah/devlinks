"use client";

import { StoreState } from "@/app/dashboard/store";
import { useStoreContext } from "@/app/dashboard/store-context";
import PlatformIcon from "@/components/icons/platform-icons";
import PreviewFrame from "@/components/phone-preview/preview-frame";
import { PLATFORM_COLORS, titleCase } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

const NO_OF_LINKS = 5;
type TLink = StoreState["links"][0];

export default function PhonePreview() {
  const links = useStoreContext((state) => state.links);
  const isLinksChanged = useStoreContext((state) => state.isLinksChanged);
  const serverLinks = useStoreContext((state) => state.serverLinks);

  const linksToUse = links.length > 0 || isLinksChanged ? links : serverLinks || [];
  const paddedLinks = [...linksToUse, ...Array(NO_OF_LINKS)].slice(0, 5) as Array<
    TLink | undefined
  >;

  return (
    <div
      className="p-6 w-full max-h-[834px] hidden lg:grid max-w-[40%] xl:max-w-[560px] bg-white rounded-xl place-items-center"
      aria-hidden
    >
      <div className="relative w-[307px] h-[631px] px-[34.5px] pt-[63.5px] pb-[53.5px] stack gap-14 items-center">
        <ProfilePreview />

        <div className="z-10 stack gap-5 w-full">
          {paddedLinks.map((link, index) => (
            <LinkPreview key={index} link={link} />
          ))}
        </div>

        <PreviewFrame className="w-full h-full absolute top-0 left-0" />
      </div>
    </div>
  );
}

function LinkPreview({ link }: { link?: TLink }) {
  return link?.platform ? (
    <div
      className="w-full rounded-lg py-3 px-4 flex items-center gap-2 text-white"
      style={{ backgroundColor: PLATFORM_COLORS[link.platform] }}
    >
      <PlatformIcon name={link.platform} color="white" />
      <span className="grow text-xs">{titleCase(link.platform)}</span>
      <ArrowRight size={16} />
    </div>
  ) : (
    <div className="h-11 w-full bg-no-preview rounded-lg">{/* platform */}</div>
  );
}

function ProfilePreview() {
  const { profile, serverProfile } = useStoreContext(({ profile, serverProfile }) => ({
    profile,
    serverProfile,
  }));
  const profileToUse = profile.id ? profile : serverProfile;

  const name = [profileToUse?.first_name, profileToUse?.last_name].join(" ");
  const convertedPicture =
    profile.profilePicture instanceof File
      ? {
          url: URL.createObjectURL(profile.profilePicture),
          name: profile.profilePicture.name,
          isFile: true,
        }
      : profile.profilePicture; //as {url: string, name: string} | undefined;

  const picture = convertedPicture || serverProfile?.profilePicture;

  useEffect(() => {
    return () => {
      if (!convertedPicture?.url) return;

      // revoke object urls to prevent memory leaks
      URL.revokeObjectURL(convertedPicture.url);
    };
  }, [convertedPicture?.url]);

  return (
    <div className="stack items-center z-10">
      <div className="w-24 shrink-0 mb-[25px] aspect-square rounded-full relative bg-no-preview overflow-hidden">
        {picture?.url && <Image src={picture.url} fill alt={name || picture.name || ""} />}
      </div>

      {name ? (
        <p className="text-lg mb-2 font-semibold">{name}</p>
      ) : (
        <div className="w-40 mb-[13px] h-4 bg-no-preview rounded-full">{/* full name */}</div>
      )}

      {profileToUse?.email ? (
        <p className="text-sm text-gray">{profileToUse.email}</p>
      ) : (
        <div className="w-[72px] h-2 rounded-full rounded-ful bg-no-preview">{/* email */}</div>
      )}
    </div>
  );
}
