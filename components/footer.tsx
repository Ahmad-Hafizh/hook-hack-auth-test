import Link from "next/link";
import { Play } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-black to-[#1a1a1a] text-white px-10 sm:px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 mb-8">
          <div className="space-y-4 flex flex-col items-center w-full">
            {/* <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">Clip-Studio</span>
            </div> */}
            {/* <span className="text-3xl font-bold text-white my-3 block">
              Hook Hack
            </span> */}
            <img src="/logonew.png" alt="HookHack Logo" className="h-12 md:h-16 w-auto py-2" />

            {/* <p className="text-gray-100 text-center md:text-center text-sm md:text-base">
              what should we write here?
            </p> */}
          </div>
          {/* <div className="hidden">
            <h4 className="font-semibold mb-4 text-center md:text-left">
              Product
            </h4>
            <ul className="space-y-2 text-gray-100 text-center md:text-left text-sm md:text-base">
              <li>
                <Link href="#" className="hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  API
                </Link>
              </li>
            </ul>
          </div>
          <div className="hidden">
            <h4 className="font-semibold mb-4 text-center md:text-left">
              Company
            </h4>
            <ul className="space-y-2 text-gray-100 text-center md:text-left text-sm md:text-base">
              <li>
                <Link href="#" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
            </div>
          <div className="hidden">
            <h4 className="font-semibold mb-4 text-center md:text-left">
              Support
            </h4>
            <ul className="space-y-2 text-gray-100 text-center md:text-left text-sm md:text-base">
              <li>
                <Link href="#" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Privacy
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-100 text-xs md:text-base">
          <p>&copy; 2025 Hook-Hack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
