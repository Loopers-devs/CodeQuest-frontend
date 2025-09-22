import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import PostsFilters from "@/components/posts/posts-filters";
import PostsListClient from "@/components/posts/posts-list-client";
import {
  PostListQuery,
  PostSortBy,
  SortOrder,
  PostVisibility,
} from "@/interfaces";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("posts");

  return {
    title: t("title") || "Posts",
    description: t("description") || "Browse all published posts",
  };
}

function buildQueryFromSearchParams(searchParams: {
  [key: string]: string | string[] | undefined;
}): PostListQuery {
  const search = searchParams.search as string;
  const category = searchParams.category as string;
  const tags = searchParams.tags as string;
  const sortBy = searchParams.sortBy as string;
  const order = searchParams.order as string;
  const cursor = searchParams.cursor as string;
  const take = searchParams.take as string;

  const query: PostListQuery = {
    publishedOnly: true,
    visibility: PostVisibility.PUBLIC,
    includes: ["author", "favorites"],
    take: 10,
    sortBy: "publishedAt",
    order: "desc",
  };

  if (search) query.search = search;
  if (category) query.category = category;
  if (tags) query.tags = tags.split(",");
  if (sortBy) query.sortBy = sortBy as PostSortBy;
  if (order) query.order = order as SortOrder;
  if (cursor) query.cursor = cursor;
  if (take) query.take = parseInt(take);

  return query;
}

interface PostsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const t = await getTranslations("posts");
  const params = await searchParams;
  const query = buildQueryFromSearchParams(params);

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {t("title")}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t("description")}
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                {t("backToHome") || "Volver al inicio"}
              </Link>
            </Button>
          </div>
        </div>

        <PostsFilters searchParams={params} />

        <PostsListClient initialQuery={query} />
      </div>
    </div>
  );
}
