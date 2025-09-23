"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import CustomButton from "@/components/custom-button";
import CustomInput from "@/components/custom-input";
import CustomSelect from "@/components/custom-select";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus, Upload } from "lucide-react";

import { getCreatePostSchema, CreatePostSchema } from "@/schema/post";
import { Post, PostStatus, PostVisibility } from "@/interfaces";
import { createPostAction, updatePostAction } from "@/actions/post.action";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { MarkdownEditor } from "@/components/ui/markdown-editor";
import { useCategories } from "@/hooks/use-category";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

interface Props {
  initialData?: Post;
}

export default function CreatePostForm({ initialData }: Props) {
  const t = useTranslations("dashboard.posts");
  const tForm = useTranslations("form");
  const tCreate = useTranslations("createPost");
  const router = useRouter();

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useCategories();

  const isEditing = !!initialData;

  const [imageUploading, setImageUploading] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [currentTag, setCurrentTag] = useState("");

  // Limpiar object URL cuando se desmonte el componente
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const schema = getCreatePostSchema({
    minLength: (min: number) => tForm("minLength", { min }),
    maxLength: (max: number) => tForm("maxLength", { max }),
    invalidUrl: tForm("invalidUrl"),
    invalidDate: tForm("invalidDate"),
    invalidSlug: tForm("invalidSlug"),
  });

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      summary: initialData?.summary || "",
      content: initialData?.content || "",
      categoryId: initialData?.categoryId || "",
      tags: initialData?.tags?.map((tag) => tag.name) || [],
      status: initialData?.status || PostStatus.DRAFT,
      visibility: initialData?.visibility || PostVisibility.PRIVATE,
      coverImageUrl: initialData?.coverImageUrl || "",
    },
  });

  const watchedValues = form.watch();

  const handleTagAdd = () => {
    if (currentTag.trim()) {
      const currentTags = (watchedValues.tags as string[]) || [];
      if (!currentTags.includes(currentTag.trim())) {
        form.setValue("tags", [...currentTags, currentTag.trim()]);
        setCurrentTag("");
      }
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    const currentTags = (watchedValues.tags as string[]) || [];
    form.setValue(
      "tags",
      currentTags.filter((tag: string) => tag !== tagToRemove)
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      toast.error(tCreate("errors.invalidImageFile"));
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(tCreate("errors.imageTooLarge"));
      return;
    }

    // Limpiar preview anterior
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }

    // Crear preview de la imagen
    setSelectedImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreviewUrl(previewUrl);
  };

  const onSubmit = async (data: CreatePostSchema) => {
    try {
      // Subir imagen si hay una seleccionada
      const finalData = { ...data };
      if (selectedImageFile) {
        setImageUploading(true);
        try {
          const imageUrl = await uploadImageToCloudinary(selectedImageFile);
          if (imageUrl) {
            finalData.coverImageUrl = imageUrl;
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Error al subir la imagen. Inténtalo de nuevo.");
          return;
        } finally {
          setImageUploading(false);
        }
      }

      const result = isEditing
        ? await updatePostAction(initialData.id, finalData)
        : await createPostAction(finalData);

      if (result?.error) {
        toast.error(
          isEditing ? t("form.updatePostError") : t("form.createPostError")
        );
        return;
      }

      toast.success(
        isEditing ? t("form.updatePostSuccess") : t("form.createPostSuccess")
      );
      form.reset();
      setSelectedImageFile(null);
      setImagePreviewUrl(null);
      router.push("/dashboard/posts");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(tCreate("errors.unexpectedError"));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEditing ? tCreate("editTitle") : tCreate("title")}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? tCreate("editSubtitle") : tCreate("subtitle")}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contenido Principal */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{tCreate("basicInfo")}</CardTitle>
                  <CardDescription>
                    {tCreate("basicInfoDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CustomInput
                    control={form.control}
                    name="title"
                    label={tCreate("postTitle")}
                    placeholder={tCreate("postTitle")}
                  />

                  <CustomInput
                    control={form.control}
                    name="slug"
                    label={t("form.slug")}
                    placeholder="url-amigable-del-post"
                  />

                  <CustomInput
                    control={form.control}
                    name="summary"
                    label={tCreate("excerpt")}
                    placeholder={tCreate("excerptPlaceholder")}
                  />
                </CardContent>
              </Card>

              <MarkdownEditor
                value={watchedValues.content || ""}
                onChange={(value) => form.setValue("content", value)}
              />
            </div>

            {/* Panel Lateral */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{tCreate("configuration")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoadingCategories ? (
                    <Skeleton className="h-10 w-full rounded-md" />
                  ) : (
                    <CustomSelect
                      control={form.control}
                      name="categoryId"
                      label={tCreate("category")}
                      placeholder={tCreate("category")}
                      items={
                        categoriesData?.items.map((category) => ({
                          label: category.name,
                          value: category.id,
                        })) || []
                      }
                    />
                  )}

                  <CustomSelect
                    control={form.control}
                    name="status"
                    label={tCreate("status")}
                    placeholder={tCreate("status")}
                    items={Object.values(PostStatus).map((status) => ({
                      label: t(`status.${status}`),
                      value: status,
                    }))}
                  />

                  <CustomSelect
                    control={form.control}
                    name="visibility"
                    label={tCreate("visibility")}
                    placeholder={tCreate("visibility")}
                    items={Object.values(PostVisibility).map((visibility) => ({
                      label: t(`visibility.${visibility}`),
                      value: visibility,
                    }))}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{tCreate("featuredImage")}</CardTitle>
                </CardHeader>
                <CardContent>
                  {imagePreviewUrl ? (
                    <div className="space-y-4">
                      <div className="relative">

                        <Image
                          src={imagePreviewUrl}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border"
                          width={600}
                          height={192}
                          priority={false}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            if (imagePreviewUrl) {
                              URL.revokeObjectURL(imagePreviewUrl);
                            }
                            setSelectedImageFile(null);
                            setImagePreviewUrl(null);
                            form.setValue(
                              "coverImageUrl",
                              initialData?.coverImageUrl || ""
                            );
                            const input = document.getElementById(
                              "image-upload"
                            ) as HTMLInputElement;
                            if (input) input.value = "";
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground text-center">
                        {tCreate("imageSelected")}
                      </p>
                    </div>
                  ) : initialData?.coverImageUrl ? (
                    <div className="space-y-4">
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={initialData.coverImageUrl}
                          alt="Current cover"
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            form.setValue("coverImageUrl", "");
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground text-center">
                        {tCreate("imageUploaded")}
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                        disabled={imageUploading}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
                        disabled={imageUploading}
                      >
                        {tCreate("selectImage")}
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        {tCreate("dragImage")}
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                        disabled={imageUploading}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
                        disabled={imageUploading}
                      >
                        {tCreate("selectImage")}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{tCreate("tags")}</CardTitle>
                  <CardDescription>
                    {tCreate("tagsDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={tCreate("newTag")}
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleTagAdd())
                      }
                      className="flex-1 px-3 py-2 border border-input rounded-md text-sm bg-background"
                    />
                    <Button
                      type="button"
                      onClick={handleTagAdd}
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {watchedValues.tags?.map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="gap-1 pr-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleTagRemove(tag)}
                          className="ml-1 hover:bg-muted-foreground/20 rounded-sm p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end">
            <CustomButton
              type="submit"
              label={
                imageUploading
                  ? tCreate("uploading")
                  : isEditing
                  ? tCreate("updatePost")
                  : tCreate("publishPost")
              }
              size="lg"
              disabled={imageUploading}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
