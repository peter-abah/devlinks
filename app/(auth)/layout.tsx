import DevlinksLogo from "@/components/icons/devlinks-logo";
import DevlinksLogoText from "@/components/icons/devlinks-logo-text";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white sm:bg-background sm:grid sm:place-items-center">
      <div className="mx-auto sm:w-fit flex flex-col sm:items-center gap-16 p-8 sm:p-10 sm:gap-[51px]">
        <div className="flex items-center gap-2">
          <DevlinksLogo />
          <DevlinksLogoText />
          <span className="sr-only">devlinks</span>
        </div>

        {children}
      </div>
    </div>
  );
}
