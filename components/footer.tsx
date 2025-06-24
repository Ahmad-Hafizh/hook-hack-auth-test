import Link from "next/link";
import { Play } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" bg-gradient-to-br from-black to-[#1a1a1a]  text-white px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            {/* <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">Clip-Studio</span>
            </div> */}
            {/* <span className="text-3xl font-bold text-white my-3 block">
              Hook Hack
            </span> */}
            <img src="/newlogo.svg" alt="Hook-Hack" className="w-40 py-2" />

            <p className="text-gray-100">
              The ultimate TikTok analytics platform for creators and brands.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-100">
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
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-100">
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
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-100">
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
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-100">
          <p>&copy; 2025 Hook-Hack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
