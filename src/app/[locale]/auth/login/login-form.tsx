"use client";
import CustomButton from "@/components/custom-button";
import CustomInput from "@/components/custom-input";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { getLoginSchema, LoginSchema } from "@/schema/auth";
import Link from "next/link";
import {useRouter} from '@/i18n/navigation';
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { clientLogin } from "@/lib/auth-client";
import { toast } from "sonner";

export const LoginForm = () => {
  const t = useTranslations("LoginPage");
  
  const router = useRouter();

  const loginSchema = getLoginSchema({
    invalidEmail: t("invalidEmail"),
    minLength: (min: number) => t("minLength", { min }),
    maxLength: (max: number) => t("maxLength", { max }),
  });

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    const result = await clientLogin(data);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success(result?.message);

    router.replace(routes.dashboard);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col">
          <CustomInput control={form.control} name="email" label={t("email")} />

          <Button variant="link" className="self-end" asChild>
            <Link href={routes.recoverPassword}>{t("forgotPassword")}</Link>
          </Button>
        </div>

        <CustomInput
          control={form.control}
          name="password"
          label={t("password")}
          type="password"
        />

        <CustomButton type="submit" label={t("submit")} className="w-full" />
      </form>
    </Form>
  );
};
