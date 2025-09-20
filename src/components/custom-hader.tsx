"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeModeToggle from "@/components/theme-mode-toggle";
import { sidebarRoutes } from "@/config/routes";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";


export default function CustomHeader() {

  const pathname = usePathname();
  const t = useTranslations("sidebar");

  const title = sidebarRoutes.find(route => route.href === pathname)?.title;

  return (
        <header className="w-full bg-background border-b flex items-center px-2 py-3 shadow-sm gap-2">
            <SidebarTrigger />
            
            {
              title && <h1 className="text-lg font-medium">{t(title)}</h1>
            }

            <ThemeModeToggle className="ml-auto" />

        </header>
  );
}
