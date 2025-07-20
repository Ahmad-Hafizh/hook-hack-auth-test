"use client";

import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-[#361a20] data-[state=open]:text-white px-3 py-2 text-white hover:bg-[#361a20] hover:text-[#fe2858] transition-colors"
            >
              <Avatar className="h-6 w-6 rounded-lg grayscale">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg text-xs bg-[#fe2858] text-white">
                  CN
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-xs leading-tight">
                <span className="truncate font-medium text-xs text-white">
                  {user.name}
                </span>
                <span className="truncate text-xs text-gray-400">
                  {user.email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-3 text-gray-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-[#060606] border-[#361a20]"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-[#fe2858] text-white">
                    CN
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-white">
                    {user.name}
                  </span>
                  <span className="truncate text-xs text-gray-400">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#361a20]" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-xs text-white hover:bg-[#361a20] hover:text-[#fe2858]">
                <UserCircleIcon className="h-3 w-3" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs text-white hover:bg-[#361a20] hover:text-[#fe2858]">
                <CreditCardIcon className="h-3 w-3" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs text-white hover:bg-[#361a20] hover:text-[#fe2858]">
                <BellIcon className="h-3 w-3" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-[#361a20]" />
            <DropdownMenuItem className="text-xs text-white hover:bg-[#361a20] hover:text-[#fe2858]">
              <LogOutIcon className="h-3 w-3" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
