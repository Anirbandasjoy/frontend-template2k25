import DashboardSidebar from "@/components/layout/dashboard/shared/Sidebar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <DashboardSidebar>{children}</DashboardSidebar>
    </div>
  );
};

export default DashboardLayout;
