import {
  addPostToFavorites,
  addPostToLikesAction,
  getAllPostsAction,
  getFavoritePostsByUser,
  removePostFromFavorites,
  removePostFromLikesAction,
} from "@/actions/post.action";
import { Post, PostListQuery, PostsOldData } from "@/interfaces";
import { useAuth } from "@/providers/AuthProvider";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const usePosts = (postListQuery: PostListQuery) => {
  const session = useAuth();

  return useInfiniteQuery({
    queryKey: ["posts"],
    initialPageParam: undefined,
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) =>
      await getAllPostsAction({ ...postListQuery, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !session.loading, // Solo se ejecuta cuando isLoading es false
    refetchOnWindowFocus: false,
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
          itemUpdated.isFavorited = true;
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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favoritePosts"] });
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
          itemUpdated.isFavorited = false;
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

      queryClient.setQueryData(["favoritePosts"], (oldData?: PostsOldData) => {
        if (!oldData) return oldData;

        const pages = oldData.pages.map((page) => {
          const filtered = page.items.filter(
            (item: Post) => item.id !== postId
          );

          if (filtered.length === page.items.length) return page;
          return { ...page, items: filtered };
        });

        return { ...oldData, pages, pageParams: oldData.pageParams };
      });
    },
    onError: (error) => {
      console.error("Error removing post from favorites:", error);
    },
  });
};

export const useFavoritePosts = ({
  take,
  nextCursor,
}: {
  take?: number;
  nextCursor?: string;
}) => {
  return useInfiniteQuery({
    queryKey: ["favoritePosts"],
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) =>
      await getFavoritePostsByUser({ take, cursor: pageParam }),
    initialPageParam: nextCursor,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
};

// ===================== Like Posts =====================
export const useAddPostToLikes = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await addPostToLikesAction(postId),
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], (oldData?: PostsOldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            items: page.items.map((item) =>
              item.id === postId
                ? { ...item, reactionsCount: item.reactionsCount + 1, likedBy: [...(item.likedBy || []), { userId: data.userId }] }
                : item
            ),
          })),
        };
      });
    },
  });
};

export const useRemovePostFromLikes = (postId: string) => {
  const queryClient = useQueryClient();

  const session = useAuth();

  return useMutation({
    mutationFn: async () => await removePostFromLikesAction(postId),
    onSuccess: () => {
      queryClient.setQueryData(["posts"], (oldData?: PostsOldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            items: page.items.map((item) =>
              item.id === postId
                ? { ...item, reactionsCount: Math.max(0, item.reactionsCount - 1), likedBy: item.likedBy?.filter(like => like.userId !== session.user?.id) }
                : item
            ),
          })),
        }

      })    
    }
  });
};
