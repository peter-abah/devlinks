"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import DevlinksLogo from "./icons/devlinks-logo";
import DevlinksLogoText from "./icons/devlinks-logo-text";
import LinkIcon from "./icons/link";
import UserIcon from "./icons/user";
import NavLink from "./nav-link";
import { buttonVariants } from "./ui/button";

export default function Navbar() {
  return (
    <header className="p-6">
      <div className="flex justify-between items-center p-4 bg-white rounded-xl">
        <div className="flex gap-1.5 items-center">
          <DevlinksLogo width={32} height={32} />
          <DevlinksLogoText width={108} height={21} />
        </div>

        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <NavLink
                href="links"
                className={({ pathname }) =>
                  cn("gap-2 flex items-center px-7 py-3 rounded-lg font-semibold ", {
                    "bg-primary-lightest text-primary": pathname === "/dashboard",
                  })
                }
              >
                <LinkIcon />
                <span>Links</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                href="profile"
                className={({ pathname }) =>
                  cn("gap-2 flex items-center px-7 py-3 rounded-lg font-semibold", {
                    "bg-primary-lighest text-primary": pathname === "/dashboard/profile",
                  })
                }
              >
                <UserIcon />
                <span>Profile details</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <Link href="preview" className={buttonVariants({ variant: "outline" })}>
          Preview
        </Link>
      </div>
    </header>
  );
}
