import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { routes } from "@/config/routes";
import { LogOutIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface Props {
  sidebarRoutes: {
    title: string;
    href: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[];
}

export const CustomSidebar = ({ sidebarRoutes }: Props) => {
  const t = useTranslations("sidebar");

  return (
    <Sidebar>
      <SidebarHeader className="pt-9" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarRoutes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href} className="flex items-center">
                      <item.icon />
                      {t(item.title)}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton
            className="text-red-600 hover:text-red-500 transition-colors"
            asChild
          >
            <Link href={routes.logout} className="flex items-center gap-2">
              <LogOutIcon />
              {t("logout")}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
};
