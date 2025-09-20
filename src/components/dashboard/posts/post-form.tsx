"use client";

import CustomButton from "@/components/custom-button";
import CustomInput from "@/components/custom-input";
import CustomSelect from "@/components/custom-select";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { CreatePostSchema, getCreatePostSchema } from "@/schema/post";
import { PostStatus, PostVisibility } from "@/interfaces";
import { createPostAction } from "@/actions/post.action";
import { toast } from "sonner";

export default function PostForm() {
  const t = useTranslations("dashboard.posts");
  const tForm = useTranslations("form");

  const schema = getCreatePostSchema({
    minLength: (min: number) => tForm("minLength", { min }),
    maxLength: (max: number) => tForm("maxLength", { max }),
    invalidUrl: tForm("invalidUrl"),
    invalidDate: tForm("invalidDate"),
    invalidSlug: tForm("invalidSlug"),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      content: "",
      category: "",
      tags: [],
      status: PostStatus.DRAFT,
      visibility: PostVisibility.PUBLIC,
      coverImageUrl: null,
    },
  });

  console.log(form.formState.errors);

  const onSubmit = async (data: CreatePostSchema) => {
    const result = await createPostAction(data);

    if (result?.error) {
        return toast.error(result.error);
    }

    toast.success("Post created successfully!");
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col"
      >
        <div>
          <h1 className="text-2xl font-semibold">{t("createPost")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("form.pageDescription")}
          </p>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4>{t("form.postInformation")}</h4>
            <p className="text-sm text-muted-foreground">
              {t("form.postInformationDescription")}
            </p>
          </div>
          <Card>
            <CardContent className="space-y-4">
              <CustomInput
                control={form.control}
                name="title"
                label={t("form.title")}
                placeholder={t("form.title")}
              />
              <CustomInput
                control={form.control}
                name="slug"
                label={t("form.slug")}
                placeholder={t("form.slug")}
              />
              <CustomInput
                control={form.control}
                name="summary"
                label={t("form.summary")}
                placeholder={t("form.summary")}
              />
              {/* TODO: Agregar content editor (Markdown) */}
              <CustomInput
                control={form.control}
                name="content"
                label={t("form.content")}
                placeholder={t("form.content")}
                value={`# Lorem ipsum dolor sit amet consectetur adipiscing elit. `}
              />
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4>{t("form.classification")}</h4>
            <p className="text-sm text-muted-foreground">
              {t("form.classificationDescription")}
            </p>
          </div>
          <Card>
            <CardContent className="space-y-4">
              <CustomInput
                control={form.control}
                name="tags"
                label={t("form.tags")}
                placeholder={t("form.tags")}
              />
              <CustomInput
                control={form.control}
                name="category"
                label={t("form.category")}
                placeholder={t("form.category")}
              />
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4>{t("form.publicationSettings")}</h4>
            <p className="text-sm text-muted-foreground">
              {t("form.publicationSettingsDescription")}
            </p>
          </div>
          <Card>
            <CardContent className="space-y-4">
              <CustomSelect
                control={form.control}
                name="status"
                label={t("form.statusLabel")}
                placeholder={t("form.statusPlaceholder")}
                items={Object.values(PostStatus).map((s) => ({
                  label: t(`status.${s}`),
                  value: s,
                }))}
              />

              <CustomSelect
                control={form.control}
                name="visibility"
                label={t("form.visibilityLabel")}
                placeholder={t("form.visibilityPlaceholder")}
                items={Object.values(PostVisibility).map((v) => ({
                  label: t(`visibility.${v}`),
                  value: v,
                }))}
              />
            </CardContent>
          </Card>
        </div>

        <CustomButton
          type="submit"
          label={t("form.createPostButton")}
          size="lg"
          className="w-fit self-end"
        />
      </form>
    </Form>
  );
}
