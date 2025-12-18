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
import Link from "next/link";

export function NavUser() {
  // Temporarily disabled Clerk to fix build
  // const { user, isLoaded } = useUser();
  const { isMobile } = useSidebar();

  // Mock user data for now
  const user = {
    imageUrl: "",
    fullName: "User",
    username: "user",
    primaryEmailAddress: { emailAddress: "user@example.com" }
  };
  const isLoaded = true;

  if (!isLoaded || !user) {
    return null; // or a loading spinner
  }

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
                <AvatarImage
                  src={user.imageUrl}
                  alt={user.fullName || user.username || "User"}
                />
                <AvatarFallback className="rounded-lg text-xs bg-[#fe2858] text-white">
                  {user.fullName ? user.fullName[0] : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-xs leading-tight">
                <span className="truncate font-medium text-xs text-white">
                  {user.fullName || user.username}
                </span>
                <span className="truncate text-xs text-gray-400">
                  {user.primaryEmailAddress?.emailAddress}
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
                  <AvatarImage
                    src={user.imageUrl}
                    alt={user.fullName || user.username || "User"}
                  />
                  <AvatarFallback className="rounded-lg bg-[#fe2858] text-white">
                    {user.fullName ? user.fullName[0] : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-white">
                    {user.fullName || user.username}
                  </span>
                  <span className="truncate text-xs text-gray-400">
                    {user.primaryEmailAddress?.emailAddress}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#361a20]" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="text-xs text-white hover:bg-[#361a20] hover:text-[#fe2858]"
              >
                <Link href="/dashboard/settings">
                  <UserCircleIcon className="h-3 w-3" />
                  Account
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-[#361a20]" />
            <DropdownMenuItem className="text-xs text-white hover:bg-[#361a20] hover:text-[#fe2858]">
              {/* Temporarily disabled Clerk SignOutButton */}
              <Link href="/sign-in" className="flex items-center gap-2">
                <LogOutIcon className="h-3 w-3" />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
