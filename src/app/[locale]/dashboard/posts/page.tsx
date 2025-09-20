import React from "react";
import PostsClient from "@/components/dashboard/posts/post-client";
import { getTranslations } from "next-intl/server";
import { Pagination } from "@/components/pagination";
import PostsSearch from "@/components/dashboard/posts/search";
import { getPostsByUserAction } from "@/actions/post.action";
import { PostStatus, PostVisibility } from "@/interfaces";

interface Props {
  searchParams: Promise<{ page?: string; take?: string; search?: string; status?: string; visibility?: string }>;
}

export default async function PostsPage({ searchParams }: Props) {
  const t = await getTranslations("dashboard.posts");

  const params = await searchParams;

  const page = params.page ? parseInt(params.page) : 1;
  const take = params.take ? parseInt(params.take) : 5;


  const translations = {
    columns: {
      title: t("columns.title"),
      status: t("columns.status"),
      visibility: t("columns.visibility"),
      published: t("columns.published"),
      views: t("columns.views"),
      comments: t("columns.comments"),
      reactions: t("columns.reactions"),
      actions: t("columns.actions"),
    },
    status: {
      DRAFT: t("status.DRAFT"),
      PUBLISHED: t("status.PUBLISHED"),
      ARCHIVED: t("status.ARCHIVED"),
    },
    visibility: {
      PUBLIC: t("visibility.PUBLIC"),
      MEMBERS: t("visibility.MEMBERS"),
      PRIVATE: t("visibility.PRIVATE"),
    },
  };

  const { items, nextCursor } = await getPostsByUserAction({ authorId: 2, take, search: params.search, status: params.status as PostStatus, visibility: params.visibility as PostVisibility});

  return (
    <div>
      <PostsSearch />  
      <PostsClient translations={translations} data={items} />
      <Pagination currentPage={page} totalPages={Math.ceil(items.length / take)} />
    </div>
  );
}
