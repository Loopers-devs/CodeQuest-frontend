"use client";
import React from "react";
import { DataTable } from "@/components/data-table";
import { createColumns, PostsTranslations } from "@/components/dashboard/posts/column";
import { Post } from "@/interfaces";

export default function PostsClient({ translations, data }: { translations: PostsTranslations; data: Post[] }) {
  const cols = React.useMemo(() => createColumns(translations), [translations]);
  return <DataTable columns={cols} data={data} />;
}
