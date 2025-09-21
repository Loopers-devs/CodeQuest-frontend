"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAuth } from "@/providers/AuthProvider";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { routes } from "@/config/routes";

export default function AuthMenu() {
  const { user, loading } = useAuth();

  const t = useTranslations("HomePage.header");

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.image || undefined} alt="profile picture" />
            <AvatarFallback>
              {user?.nickname?.charAt(0) ?? user?.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{t("dashboard")}</DropdownMenuItem>
          <DropdownMenuItem>{t("myPosts")}</DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={routes.favorites}>{t("favorites")}</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{t("logout")}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button variant="outline" size="sm" asChild>
      <Link href={routes.login}>
        <User className="h-4 w-4 mr-2" />
        {t("login")}
      </Link>
    </Button>
  );
}
