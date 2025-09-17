"use client";
import CustomButton from "@/components/custom-button";
import CustomInput from "@/components/custom-input";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { getRegisterSchema, RegisterSchema } from "@/schema/auth";
import { clientRegister } from "@/lib/auth-client";
import { toast } from "sonner";
import {useRouter} from '@/i18n/navigation';
import { routes } from "@/config/routes";

export const RegisterForm = () => {
  const t = useTranslations("RegisterPage");
  const router = useRouter();

  const registerSchema = getRegisterSchema({
    invalidEmail: t("invalidEmail"),
    minLength: (min: number) => t("minLength", { min }),
    maxLength: (max: number) => t("maxLength", { max }),
    passwordsDoNotMatch: t("passwordsDoNotMatch"),
  })

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  console.log(form.formState.errors);

  const onSubmit = async (data: RegisterSchema) => {
    const resp = await clientRegister(data);

    if (resp?.error) {
      return toast.error(resp.error);
    }

    toast.success(resp.message);
    router.replace(routes.dashboard);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomInput control={form.control} name="email" label={t("email")} />

        <CustomInput control={form.control} name="fullName" label={t("fullName")} />

        <CustomInput
          control={form.control}
          name="password"
          label={t("password")}
          type="password"
        />

        <CustomInput
          control={form.control}
          name="confirmPassword"
          label={t("confirmPassword")}
          type="password"
        />

        <CustomButton type="submit" label={t("submit")} className="w-full" />
      </form>
    </Form>
  );
};
