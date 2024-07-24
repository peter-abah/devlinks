"use client";

import DevlinksLogo from "@/components/icons/devlinks-logo";
import DevlinksLogoText from "@/components/icons/devlinks-logo-text";
import Eye from "@/components/icons/eye";
import LinkIcon from "@/components/icons/link";
import UserIcon from "@/components/icons/user";
import NavLink from "@/components/nav-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navLinkClassNames = {
  default: "gap-2 flex items-center px-7 py-3 rounded-lg font-semibold hover:text-primary",
  active: "bg-primary-lightest text-primary",
};
export default function Navbar() {
  return (
    <header className="pb-4 md:p-6 shrink-0">
      <div className="flex justify-between items-center p-4 pl-6 bg-white rounded-xl">
        <div className="flex gap-1.5 items-center">
          <DevlinksLogo width={32} height={32} />
          <DevlinksLogoText width={108} height={21} className="hidden md:block" />
        </div>

        <nav>
          <ul className="flex items-center md:gap-4">
            <li>
              <NavLink
                href="/dashboard"
                className={({ pathname }) =>
                  cn(navLinkClassNames.default, {
                    [navLinkClassNames.active]: pathname === "/dashboard",
                  })
                }
              >
                <LinkIcon />
                <span className="sr-only md:not-sr-only">Links</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                href="/dashboard/profile"
                className={({ pathname }) =>
                  cn(navLinkClassNames.default, {
                    [navLinkClassNames.active]: pathname === "/dashboard/profile",
                  })
                }
              >
                <UserIcon />
                <span className="sr-only md:not-sr-only">Profile details</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <Link href="preview" className={cn(buttonVariants({ variant: "outline" }), "px-4 md:px-7")}>
          <Eye className="md:hidden" />
          <span className="sr-only md:not-sr-only">Preview</span>
        </Link>
      </div>
    </header>
  );
}
