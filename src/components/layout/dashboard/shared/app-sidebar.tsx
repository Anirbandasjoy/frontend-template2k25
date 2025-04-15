"use client";

import * as React from "react";
import {
  BadgeCheck,
  CreativeCommonsIcon,
  Info,
  ListFilterPlus,
  LucideLayoutDashboard,
  Moon,
  Plus,
  Settings,
  SunMoon,
  Trash2,
  User,
  UserCog,
  UserRoundPen,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";

const data = {
  user: {
    name: "Joy das",
    email: "joy600508@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Frontend Template",
      logo: BadgeCheck,
      plan: "demo your next dashboard",
      url: "/",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LucideLayoutDashboard,
      isActive: false,
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
      isActive: false,
      items: [
        {
          title: "Manage Users",
          url: "/dashboard/users",
          icon: UserCog,
        },
      ],
    },
    {
      title: "Blogs",
      url: "#",
      icon: UserRoundPen,
      isActive: false,
      items: [
        {
          title: "Add Blog",
          url: "/dashboard/add-blog",
          icon: Plus,
        },
        {
          title: "Manage Blog",
          url: "/dashboard/manage-blog",
          icon: ListFilterPlus,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Account",
          icon: User,
          url: "/dashboard/account",
        },
        {
          title: "Personal info",
          icon: Info,
          url: "/personal-info",
        },
        {
          title: "Delete Account",
          icon: Trash2,
        },
      ],
    },
    {
      name: "Themes",
      url: "#",
      icon: SunMoon,
      items: [
        {
          title: "Light Mode",
          icon: Moon,

          theme: "light",
        },
        {
          title: "Dark Mode",
          icon: SunMoon,
          theme: "dark",
        },
        {
          title: "System",
          icon: CreativeCommonsIcon,
          theme: "system",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
