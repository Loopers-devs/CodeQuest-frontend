import { useTranslations } from "next-intl";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./login-form";

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
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>
  );
}
