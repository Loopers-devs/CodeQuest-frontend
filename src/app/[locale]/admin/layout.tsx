import CustomHeader from "@/components/custom-hader";
import { CustomSidebar } from "@/components/custom-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { adminSidebarRoutes } from "@/config/routes";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <CustomSidebar sidebarRoutes={adminSidebarRoutes} />
      <div className="w-full">
        <CustomHeader />
        <main className="container mx-auto p-4">{children}</main>
      </div>
    </SidebarProvider>
  );
}
