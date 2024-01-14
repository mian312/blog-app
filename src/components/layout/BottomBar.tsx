"use client"

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomBar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-slate-700 sticky flex bottom-0 z-20 w-full px-6 py-3 items-center justify-between md:hidden">
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            key={link.label}
            href={link.route}
            className={`flex gap-2 items-center rounded-lg py-2 px-4 ${isActive && "bg-purple-1"
              }`}
          >
            {link.icon} <p className="text-small-medium text-white">{link.label.split(/\s+/)[0]}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomBar;