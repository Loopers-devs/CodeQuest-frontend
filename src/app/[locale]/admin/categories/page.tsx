import React from "react";
import CategoriesClient from "@/components/admin/categories/category-client";
import CategoriesSearch from "@/components/admin/categories/search";
import { getTranslations } from "next-intl/server";


export default async function CategoriesPage() {
  const t = await getTranslations("admin.categories");

  const translations = {
    columns: {
      name: t("columns.name"),
      description: t("columns.description"),
      posts: t("columns.posts"),
      actions: t("columns.actions"),
    },
  };

  return (
    <div>
      <CategoriesSearch />
      <CategoriesClient translations={translations}  />
    </div>
  );
}