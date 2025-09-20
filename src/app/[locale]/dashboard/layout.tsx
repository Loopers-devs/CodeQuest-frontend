import CustomHeader from "@/components/custom-hader";
import { CustomSidebar } from "@/components/custom-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { sidebarRoutes } from "@/config/routes";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <CustomSidebar sidebarRoutes={sidebarRoutes} />
        <div className="w-full">
          <CustomHeader />
          <main className="container mx-auto p-4">{ children }</main>
        </div>
    </SidebarProvider>
  );
}