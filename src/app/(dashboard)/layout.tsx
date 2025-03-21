import DashboardSidebar from "@/components/layout/dashboard/shared/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashboardSidebar>{children}</DashboardSidebar>
    </div>
  );
}
