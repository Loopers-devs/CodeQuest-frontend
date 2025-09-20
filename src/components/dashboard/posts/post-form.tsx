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
import {
  getCreatePostSchema,
  UpdatePostSchema,
  CreatePostSchema,
} from "@/schema/post";
import { Post, PostStatus, PostVisibility } from "@/interfaces";
import { createPostAction, updatePostAction } from "@/actions/post.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  post?: Post;
}

export default function PostForm({ post }: Props) {
  const t = useTranslations("dashboard.posts");
  const tForm = useTranslations("form");

  const router = useRouter();

  const schema = getCreatePostSchema({
    minLength: (min: number) => tForm("minLength", { min }),
    maxLength: (max: number) => tForm("maxLength", { max }),
    invalidUrl: tForm("invalidUrl"),
    invalidDate: tForm("invalidDate"),
    invalidSlug: tForm("invalidSlug"),
  });

  const defaultValues = {
    title: post?.title || "",
    slug: post?.slug || "",
    summary: post?.summary || "",
    content: post?.content || "",
    category: post?.category || "",
    tags: post?.tags || [],
    status: post?.status || PostStatus.DRAFT,
    visibility: post?.visibility || PostVisibility.PRIVATE,
    coverImageUrl: "https://via.placeholder.com/800x400.png?text=Cover+Image",
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: unknown) => {
    const payload = data as Partial<UpdatePostSchema>;

    if (post) {
      const result = await updatePostAction(post.id, payload);

      if (result?.error) {
        toast.error(t("form.updatePostError"));
        return;
      }
      toast.success(t("form.updatePostSuccess"));

      return router.push("/dashboard/posts");
    }

    const result = await createPostAction(payload as CreatePostSchema);

    if (result?.error) {
      toast.error(t("form.createPostError"));
      return;
    }

    toast.success(t("form.createPostSuccess"));
    form.reset();
    return router.push("/dashboard/posts");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col"
      >
        <div>
          <h1 className="text-2xl font-semibold">
            {post ? t("form.editPost") : t("createPost")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {post
              ? t("form.editPostPageDescription")
              : t("form.pageDescription")}
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
          label={post ? t("form.updatePostButton") : t("form.createPostButton")}
          size="lg"
          className="w-fit self-end"
        />
      </form>
    </Form>
  );
}
