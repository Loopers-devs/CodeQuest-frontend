import {
  addPostToFavorites,
  getAllPostsAction,
  removePostFromFavorites,
} from "@/actions/post.action";
import { Post, PostListQuery, PostsOldData } from "@/interfaces";
import { useAuth } from "@/providers/AuthProvider";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const usePosts = (postListQuery: PostListQuery) => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    initialPageParam: undefined,
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) =>
      await getAllPostsAction({ ...postListQuery, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
};

// ===================== Favorite Posts =====================
export const useAddPostToFavorites = (postId: string) => {
  const queryClient = useQueryClient();

  const session = useAuth().user;

  return useMutation({
    mutationFn: async () => await addPostToFavorites(postId),
    onSuccess: () => {
      queryClient.setQueryData(["posts"], (oldData?: PostsOldData) => {
        if (!oldData) return oldData;

        const items: Post[] = oldData.pages.flatMap((page) => page.items);
        const itemUpdated = items.find((item: Post) => item.id === postId);

        if (itemUpdated && session?.id) {
          itemUpdated.favoritedBy = itemUpdated.favoritedBy || [];
          itemUpdated.favoritedBy.push({ userId: session.id });
        }

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            items: page.items.map((item) => {
              if (item.id === postId) {
                return itemUpdated;
              }
              return item;
            }),
          })),
        };
      });
    },
    onError: (error) => {
      console.error("Error adding post to favorites:", error);
    },
  });
};

export const useRemovePostFromFavorites = (postId: string) => {
  const queryClient = useQueryClient();
  const session = useAuth().user;

  return useMutation({
    mutationFn: async () => await removePostFromFavorites(postId),
    onSuccess: () => {
      queryClient.setQueryData(["posts"], (oldData?: PostsOldData) => {
        if (!oldData) return oldData;

        const items: Post[] = oldData.pages.flatMap((page) => page.items);
        const itemUpdated = items.find((item: Post) => item.id === postId);

        if (itemUpdated && session?.id) {
          itemUpdated.favoritedBy = itemUpdated.favoritedBy?.filter(
            (fav) => fav.userId !== session.id,
          );
        }

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            items: page.items.map((item) => {
              if (item.id === postId) {
                return itemUpdated;
              }
              return item;
            }),
          })),
        };
      });
    },
    onError: (error) => {
      console.error("Error removing post from favorites:", error);
    },
  });
};
