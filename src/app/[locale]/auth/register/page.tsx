import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SocialAuth from "@/components/social-auth";
import Link from "next/link";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  const t = useTranslations("RegisterPage");

  return (
    <div className="flex items-center justify-center h-svh w-full">
      <Card className="max-w-[400px] w-full">
        <CardHeader>
          <CardTitle>{t("welcome")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />

          <div className="flex justify-center">
            <Button variant="link" asChild>
              <Link href={routes.login}>{t("alreadyHaveAccount")}</Link>
            </Button>
          </div>
        </CardContent>
        <SocialAuth />
      </Card>
    </div>
  );
}
