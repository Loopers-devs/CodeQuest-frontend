import { createComment, getCommentsByPostId } from "@/actions/comment.action";
import { CommentListQuery } from "@/interfaces";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type UsePostCommentsOpts = Omit<CommentListQuery, "page"> & {
  pageSize?: number;
};

export function usePostComments(opts: UsePostCommentsOpts) {
  const {
    postId,
    pageSize = 20,
    search,
    parentId, // undefined => top-level; definido => respuestas
  } = opts;

  return useInfiniteQuery({
    queryKey: [
      "post-comments",
      { postId, search: search ?? "", parentId: parentId ?? null, pageSize },
    ],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const res = await getCommentsByPostId({
        postId,
        page: pageParam,
        pageSize,
        search,
        parentId,
      });
      return res;
    },
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      // Si el backend retorna hasNext y totalPages
      if (!lastPage.hasNext) return undefined;
      const next = lastPageParam + 1;
      return next <= lastPage.totalPages ? next : undefined;
    },
    getPreviousPageParam: (_firstPage, _pages, firstPageParam) => {
      const prev = firstPageParam - 1;
      return prev >= 1 ? prev : undefined;
    },
  });
}

export function useCreateComment() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (body: {
      postId: string;
      content: string;
      parentId?: string;
    }) => createComment(body),
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["post-comments"] });
    }
  });
}
