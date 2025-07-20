"use client";

import { MailIcon, PlusCircleIcon, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-3 px-2 py-3">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              asChild
              tooltip="Quick Create"
              className="min-w-8 bg-[#fe2858] text-white duration-200 ease-linear hover:bg-[#fe2858]/90 hover:text-white active:bg-[#fe2858]/90 active:text-white text-xs px-3 py-2"
            >
              <a href="/app">
                <PlusCircleIcon className="h-3 w-3" />
                <span className="text-xs">Quick Create</span>
              </a>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="h-8 w-8 shrink-0 group-data-[collapsible=icon]:opacity-0 border-[#361a20] bg-[#060606] text-white hover:bg-[#361a20] hover:text-white"
              variant="outline"
            >
              <MailIcon className="h-3 w-3" />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="text-xs px-3 py-2.5 text-white hover:bg-[#361a20] hover:text-[#fe2858] data-[active=true]:bg-[#fe2858] data-[active=true]:text-white transition-colors"
                data-active={item.isActive}
              >
                <a href={item.url}>
                  {item.icon && <item.icon className="h-3.5 w-3.5" />}
                  <span className="text-xs">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
