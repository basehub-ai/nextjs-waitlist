'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Constants for sizing
const LINK_WIDTH = 90;
const PADDING = 24;
const BACKGROUND_PADDING = 20;

// NavbarLink component
export const NavbarLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`relative px-4 py-1.5 text-sm font-mono transition-colors duration-200
        ${pathname === href ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
    >
      {children}
    </Link>
  );
};

// NavbarLinkBackground component
export const NavbarLinkBackground = ({ links }: { links: string[] }) => {
  const pathname = usePathname();
  const activeIndex = links.indexOf(pathname);

  return (
    <div
      className="absolute transition-all duration-200 ease-in-out h-[32px] rounded-full bg-slate-8"
      style={{
        width: `${LINK_WIDTH + 10}px`,
        left: `${activeIndex * (LINK_WIDTH + PADDING)}px`,
        top: '50%',
        transform: 'translateY(-50%)',
      }}
    />
  );
};
