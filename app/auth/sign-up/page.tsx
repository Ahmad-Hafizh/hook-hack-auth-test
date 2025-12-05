import { GalleryVerticalEnd } from 'lucide-react';

import { SignupForm } from './signup-form';
import Link from 'next/link';
import Image from 'next/image';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#121212] relative overflow-hidden flex items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#fe2858] via-transparent to-transparent"></div>
      </div>
      {/* Centered group */}
      <div className="flex flex-col items-center w-full max-w-md z-10">
        <Link href="/" className="mb-8 block focus:outline-none focus:ring-2 focus:ring-[#fe2858] rounded-lg">
          <Image src="/newlogo.svg" alt="Hook-Hack Logo" width={200} height={44} className="h-11 w-auto" priority />
        </Link>
        <SignupForm />
        {/* Back to Landing Page link */}
        <Link href="/" className="mt-10 text-white hover:text-[#fe2858] font-medium transition-colors duration-200 flex items-center gap-2 group">
          <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
          <span>Back to Landing Page</span>
        </Link>
      </div>
    </div>
  );
}
