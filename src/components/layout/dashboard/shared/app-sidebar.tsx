"use client";

import * as React from "react";
import {
  CreativeCommonsIcon,
  Info,
  LayoutDashboard,
  Moon,
  NotebookPen,
  Settings,
  SunMoon,
  Trash2,
  User,
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

// This is sample data.
const data = {
  user: {
    name: "Template",
    email: "templatet@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Template",
      logo: LayoutDashboard,
      plan: "Template design",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Manage Users",
          url: "/users",
        },
        {
          title: "Add User",
          url: "#",
        },
      ],
    },
    {
      title: "Blog",
      url: "#",
      icon: NotebookPen,
      items: [
        {
          title: "Manage Blog",
          url: "#",
        },
        {
          title: "Add Blog",
          url: "#",
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
        },
        {
          title: "Personal info",
          icon: Info,
          url: "#",
        },
        {
          title: "Delete Account",
          icon: Trash2,
          url: "#",
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
          url: "#",
        },
        {
          title: "Dark Mode",
          icon: SunMoon,
          url: "#",
        },
        {
          title: "System",
          icon: CreativeCommonsIcon,
          url: "#",
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
