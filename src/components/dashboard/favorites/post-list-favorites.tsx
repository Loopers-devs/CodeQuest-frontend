"use client";
import CustomButton from "@/components/custom-button";
import { useFavoritePosts } from "@/hooks/use-post";
import PostCard from "@/shared/components/PostCard";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Skeleton } from '@/components/ui/skeleton';

export default function PostListFavorites() {
  const { data, isLoading, fetchNextPage, isFetching, hasNextPage } =
    useFavoritePosts({ take: 6 });
  const t = useTranslations("HomePage");

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonPostFavorite key={index} />
            ))}
          </>
        ) : (
          <>
            {data?.pages.map((page) =>
              page?.items.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </>
        )}
      </div>
      {hasNextPage && (
        <div className="mt-12 text-center">
          <CustomButton
            size="lg"
            variant="outline"
            className="bg-background/80 backdrop-blur"
            isLoading={isLoading || isFetching}
            onClick={() => fetchNextPage()}
          >
            {t("load-more")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </CustomButton>
        </div>
      )}
    </>
  );
}

export const SkeletonPostFavorite = () => {
    return (
        <Skeleton className="h-72 w-full rounded-lg" />
    )
}
