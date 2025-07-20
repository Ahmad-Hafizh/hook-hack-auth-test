"use client";

import {
  FolderIcon,
  MoreHorizontalIcon,
  ShareIcon,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavDocuments({
  items,
  title,
}: {
  items: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
  title?: string;
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-xs font-medium px-3 py-2 text-gray-300">
        {title}
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              className="text-xs px-3 py-2 text-white hover:bg-[#361a20] hover:text-[#fe2858] transition-colors"
            >
              <a href={item.url}>
                <item.icon className="h-3.5 w-3.5" />
                <span className="text-xs">{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="rounded-sm data-[state=open]:bg-[#361a20] text-white hover:text-[#fe2858]"
                >
                  <MoreHorizontalIcon className="h-3 w-3" />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-24 rounded-lg bg-[#060606] border-[#361a20]"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem className="text-white hover:bg-[#361a20] hover:text-[#fe2858]">
                  <FolderIcon className="h-3 w-3" />
                  <span className="text-xs">Open</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-[#361a20] hover:text-[#fe2858]">
                  <ShareIcon className="h-3 w-3" />
                  <span className="text-xs">Share</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-gray-400 text-xs px-3 py-2 hover:text-[#fe2858] transition-colors">
            <MoreHorizontalIcon className="text-gray-400 h-3.5 w-3.5" />
            <span className="text-xs">More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
