"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, forwardRef } from "react";

interface LinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  className: ({ pathname }: { pathname: string }) => string | undefined;
}

const NavLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, href, ...props }, ref) => {
    const pathname = usePathname();

    return (
      <Link ref={ref} className={className({ pathname })} href={href} {...props}>
        {children}
      </Link>
    );
  }
);
NavLink.displayName = "NavLink";

export default NavLink;
