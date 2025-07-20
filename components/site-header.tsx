import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface SiteHeaderProps {
  title?: string;
}

export function SiteHeader({ title = "Dashboard" }: SiteHeaderProps) {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b border-[#361a20] bg-[#060606] text-white transition-[width,height] ease-linear py-8">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-white hover:text-[#fe2858] transition-colors" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 bg-[#361a20]"
        />
        <h1 className="text-base font-medium text-white">{title}</h1>
      </div>
    </header>
  );
}
