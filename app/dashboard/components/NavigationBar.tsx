import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function NavigationBar() {
  return (
    <nav className="bg-[#181818] shadow-md border-b border-[#232323]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-12 sm:px-12 sm:py-8 lg:px-16 lg:py-12 h-20">
        <div className="flex items-center space-x-2">
          <a href="/dashboard">
            <img src="/newlogo.svg" alt="logo" className="h-9 w-auto my-3" />
          </a>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-white hover:text-[#fe2858] transition-colors font-semibold"
          >
            Home
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}
