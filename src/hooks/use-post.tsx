import { getAllPostsAction } from "@/actions/post.action";
import { PostListQuery } from "@/interfaces";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePosts = (postListQuery: PostListQuery) => {
    return useInfiniteQuery({
        queryKey: ["posts"],
        initialPageParam: undefined,
        queryFn: async ({ pageParam }: { pageParam: string | undefined }) => await getAllPostsAction({ ...postListQuery, cursor: pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });
}