"use client";

import { useState, useEffect } from "react";
import { usePosts } from "@/hooks/use-post";
import { PostListQuery, PostSortBy, SortOrder } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import PostCard from "@/shared/components/PostCard";
import { useSearchParams } from "next/navigation";

interface PostsListClientProps {
  initialQuery: PostListQuery;
}

const SkeletonPost = () => {
  return (
    <Skeleton className="h-72 w-full rounded-lg" />
  );
};

export default function PostsListClient({ initialQuery }: PostsListClientProps) {
  const searchParams = useSearchParams();

  const [query, setQuery] = useState<PostListQuery>(initialQuery);

  // Update query when searchParams change
  useEffect(() => {
    const search = searchParams.get("search") || undefined;
    const category = searchParams.get("category") || undefined;
    const tags = searchParams.get("tags")?.split(",") || undefined;
    const sortBy = (searchParams.get("sortBy") as PostSortBy) || "publishedAt";
    const order = (searchParams.get("order") as SortOrder) || "desc";
    const cursor = searchParams.get("cursor") || undefined;
    const take = searchParams.get("take") ? parseInt(searchParams.get("take")!) : 10;

    setQuery({
      ...initialQuery,
      search,
      category,
      tags,
      sortBy,
      order,
      cursor,
      take,
    });
  }, [searchParams, initialQuery]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = usePosts(query);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonPost key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-destructive">
              Error al cargar los posts
            </p>
            <p className="text-center text-sm text-muted-foreground mt-2">
              {error?.message || "Por favor, inténtalo de nuevo más tarde"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const posts = data?.pages.flatMap(page => page.items) || [];

  return (
    <div className="space-y-6">
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

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
                Cargando...
              </>
            ) : (
              "Cargar más posts"
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