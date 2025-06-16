import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-blue-500" />
          <h1 className="text-xl font-bold text-slate-800">TikTok Analysis Tool</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-slate-600 hover:text-blue-500 transition-colors text-sm">
            Dashboard
          </a>
          <a href="#" className="text-slate-600 hover:text-blue-500 transition-colors text-sm">
            History
          </a>
          <a href="#" className="text-slate-600 hover:text-blue-500 transition-colors text-sm">
            Help
          </a>
        </nav>
        <Button variant="outline" size="sm" className="hidden md:inline-flex">
          Contact Us
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </div>
    </header>
  );
}