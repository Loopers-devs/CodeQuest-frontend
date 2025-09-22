"use client";

import { useState } from "react";
import { usePosts } from "@/hooks/use-post";
import { PostListQuery, PostSortBy, SortOrder, PostVisibility } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search, SortAsc, SortDesc } from "lucide-react";
import PostCard from "@/shared/components/PostCard";
import { useTranslations } from "next-intl";

interface PostsClientProps {
  initialQuery?: Partial<PostListQuery>;
}

export default function PostsClient({ initialQuery = {} }: PostsClientProps) {
  const t = useTranslations("posts");

  const [query, setQuery] = useState<PostListQuery>({
    publishedOnly: true,
    visibility: PostVisibility.PUBLIC,
    take: 10,
    sortBy: "publishedAt",
    order: "desc",
    includes: ["author", "favorites"],
    ...initialQuery,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = usePosts(query);

  const handleSearchChange = (search: string) => {
    setQuery(prev => ({ ...prev, search: search || undefined }));
  };

  const handleSortByChange = (sortBy: PostSortBy) => {
    setQuery(prev => ({ ...prev, sortBy }));
  };

  const handleOrderChange = (order: SortOrder) => {
    setQuery(prev => ({ ...prev, order }));
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-destructive">
              {t("errorLoadingPosts") || "Error loading posts"}
            </p>
            <p className="text-center text-sm text-muted-foreground mt-2">
              {error?.message || "Please try again later"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const posts = data?.pages.flatMap(page => page.items) || [];
  const totalPosts = posts.length;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            {t("filters") || "Filters"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("search") || "Search"}
              </label>
              <Input
                placeholder={t("searchPlaceholder") || "Search posts..."}
                value={query.search || ""}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("sortBy") || "Sort by"}
              </label>
              <Select
                value={query.sortBy}
                onValueChange={handleSortByChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="publishedAt">
                    {t("publishedAt") || "Published date"}
                  </SelectItem>
                  <SelectItem value="views">
                    {t("views") || "Views"}
                  </SelectItem>
                  <SelectItem value="reactionsCount">
                    {t("reactions") || "Reactions"}
                  </SelectItem>
                  <SelectItem value="commentsCount">
                    {t("comments") || "Comments"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Order */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("order") || "Order"}
              </label>
              <Select
                value={query.order}
                onValueChange={handleOrderChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">
                    <div className="flex items-center gap-2">
                      <SortDesc className="h-4 w-4" />
                      {t("descending") || "Descending"}
                    </div>
                  </SelectItem>
                  <SelectItem value="asc">
                    <div className="flex items-center gap-2">
                      <SortAsc className="h-4 w-4" />
                      {t("ascending") || "Ascending"}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {t("showingPosts", { count: totalPosts }) || `Showing ${totalPosts} posts`}
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              {t("noPostsFound") || "No posts found"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasNextPage && (
        <div className="flex justify-center">
          <Button
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
            size="lg"
            className="min-w-[200px]"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t("loading") || "Loading..."}
              </>
            ) : (
              t("loadMore") || "Load More"
            )}
          </Button>
        </div>
      )}

      {/* Loading indicator for next page */}
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
    </div>
  );
}