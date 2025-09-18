import React from "react";
import PostsClient from "@/components/dashboard/posts/post-client";
import { mockPosts } from "@/lib/mocks/posts";
import { getTranslations } from "next-intl/server";
import { Pagination } from "@/components/pagination";
import PostsSearch from "@/components/dashboard/posts/search";

interface Props {
  searchParams: Promise<{ page?: string; take?: string; search?: string; status?: string; visibility?: string }>;
}

export default async function PostsPage({ searchParams }: Props) {
  const t = await getTranslations("dashboard.posts");

  const params = await searchParams;

  const page = params.page ? parseInt(params.page) : 1;
  const take = params.take ? parseInt(params.take) : 5;

  // apply filters from URL (search, status, visibility) to the mock data
  const search = params.search ? params.search.trim().toLowerCase() : "";
  const statusFilter = params.status ? params.status : undefined;
  const visibilityFilter = params.visibility ? params.visibility : undefined;

  const filtered = mockPosts.filter((p) => {
    if (statusFilter && p.status !== statusFilter) return false;
    if (visibilityFilter && p.visibility !== visibilityFilter) return false;
    if (search) {
      const inTitle = p.title?.toLowerCase().includes(search);
      const inSlug = p.slug?.toLowerCase().includes(search);
      const inSummary = p.summary?.toLowerCase().includes(search);
      return !!(inTitle || inSlug || inSummary);
    }
    return true;
  });

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

  const data = filtered.slice((page - 1) * take, page * take);
  const totalPages = Math.ceil(filtered.length / take);

  return (
    <div>
      <PostsSearch />  
      <PostsClient translations={translations} data={data} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
