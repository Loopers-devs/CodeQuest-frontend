"use client";
import PostCard from "./PostCard";
import { ArrowRight } from "lucide-react";
import CustomButton from "@/components/custom-button";
import { usePosts } from "@/hooks/use-post";
import React from "react";
import { useTranslations } from "next-intl";

export default function PostList() {
  const { data, isLoading, fetchNextPage, isFetching, hasNextPage } = usePosts({
    take: 4,
    includes: ["author"],
  });

  const t = useTranslations("HomePage");

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {data?.pages.map((page) =>
          page?.items.map((post) => <PostCard key={post.id} post={post} />)
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
            { t("load-more") }
            <ArrowRight className="ml-2 h-5 w-5" />
          </CustomButton>
        </div>
      )}
    </>
  );
}
