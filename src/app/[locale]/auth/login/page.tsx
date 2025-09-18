import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./login-form";
import SocialAuth from "@/components/social-auth";
import Link from "next/link";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const t = useTranslations("LoginPage");

  return (
    <div className="flex items-center justify-center h-svh w-full">
      <Card className="max-w-[400px] w-full">
        <CardHeader>
          <CardTitle>{t("welcome")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />

          <div className="flex justify-center">
            <Button variant="link" asChild className="">
              <Link href={routes.register}>{t("noAccount")}</Link>
            </Button>
          </div>
        </CardContent>
        <SocialAuth />
      </Card>
    </div>
  );
}
