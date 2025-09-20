"use client";
import CustomButton from "@/components/custom-button";
import CustomInput from "@/components/custom-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { User } from "@/interfaces";
import { EditUserFormData, getEditUserSchema } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

interface Props {
    user: User
}

export default function ProfileForm({ user }: Props) {

    const t = useTranslations('dashboard.profile');
    const tForm = useTranslations('form');

    const userSchema = getEditUserSchema({
        invalidEmail: tForm('invalidEmail'),
        minLength: (min: number) => tForm('minLength', { min }),
        maxLength: (max: number) => tForm('maxLength', { max }),
    });


    const form = useForm<EditUserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            fullName: user?.fullName || '',
            nickname: user?.nickname || '',
            email: user?.email || ''
        }
    })


    return (
        <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {t('profilePicture')}
          </CardTitle>
          <CardDescription>{t('updateProfilePicture')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Avatar className="w-24 h-24 text-3xl">
            <AvatarImage src={user?.image || undefined} />
            <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex gap-3 mt-4">
            <Button variant="outline">{t('changeAvatar')}</Button>
            <Button variant="danger_outline" disabled={!user?.image}>
              {t('removeAvatar')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card >
        <CardHeader>
            <CardTitle>{t('profileInformation')}</CardTitle>
            <CardDescription>{t('updateProfileInformation')}</CardDescription>
        </CardHeader>
        <CardContent >
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-4">
                    <CustomInput 
                        name="fullName"
                        label={t('fullName')}
                        control={form.control}
                    />

                    <CustomInput 
                        name="nickname"
                        label={t('nickname')}
                        control={form.control}
                    />


                    <CustomInput 
                        name="email"
                        label={t('email')}
                        control={form.control}
                        type="email"
                    />


                    <CustomButton type="submit" disabled={form.formState.isSubmitting}>
                        {t('updateProfile')}
                    </CustomButton>
                </form>
            </Form>
        </CardContent>

      </Card>
    </div>
    )
}