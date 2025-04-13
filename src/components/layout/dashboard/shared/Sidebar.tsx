"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppSidebar } from "./app-sidebar";
import { useTheme } from "next-themes";

export default function DashboardSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const [path2] = path?.split("/")?.slice(2, 3);
  const path3 = path2?.split("-")?.join(" ");
  console.log({ path2 });
  const { theme } = useTheme();
  return (
    <SidebarProvider className="relative">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList className="text-gray-500 no-underline">
                <BreadcrumbItem className="hidden md:block text-gray-500">
                  <Link
                    href="/dashboard"
                    className="no-underline capitalize cursor-pointer "
                  >
                    Dashboard
                  </Link>
                </BreadcrumbItem>
                {path3 && <BreadcrumbSeparator className="hidden md:block" />}
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-600 capitalize cursor-pointer">
                    {path3}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="p-4 pt-0 z-20">{children}</div>
        <div
          className={`absolute bottom-0 right-0 w-full h-[calc(100vh-200px)] bg-gradient-to-t z-10  ${
            theme === "dark"
              ? "opacity-10 from-[#6da9e9] via-[#020618] to-[#020618] "
              : "opacity-25 from-[#7eb1e9] via-[#ffffff] to-[#ffffff]"
          }`}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
