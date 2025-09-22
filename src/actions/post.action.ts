"use server";
import { PagedResult, Post, PostListQuery } from "@/interfaces";
import { buildUrlWithParams } from "@/lib/build-url-with-params";
import { serverAuthFetchWithRefresh } from "@/lib/serverAuthFetch";
import { CreatePostSchema } from "@/schema/post";
import { revalidatePath } from "next/cache";

const URL_POSTS_LIKE = "/like";

export async function createPostAction(
  inputs: CreatePostSchema
): Promise<{ error: string | null; status: number; data: Post | null }> {
  const res = await serverAuthFetchWithRefresh("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  });

  if (!res.ok) {
    return { error: "Error creating post", status: res.status, data: null };
  }

  const data = await res.json();
  revalidatePath("/dashboard/posts");

  return { error: null, status: res.status, data };
}

export async function getPostsByUserAction(postListQuery: PostListQuery) {
  const { authorId, ...rest } = postListQuery;


  const url = `/posts/author/${authorId}`;

  const params = new URLSearchParams();

  Object.entries(rest).forEach(([key, value]) => {
    if (!value) return;

    params.append(key, String(value));
  });

  const queryString = params.toString();

  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const res = await serverAuthFetchWithRefresh(fullUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error fetching posts");
  }

  const data = await res.json();

  return data as { items: Post[]; nextCursor: string | null };
}

export async function updatePostAction(
  id: string,
  inputs: Partial<CreatePostSchema>
): Promise<{ error: string | null; status: number; data: Post | null }> {
  const res = await serverAuthFetchWithRefresh(`/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  });

  if (!res.ok) {
    return { error: "Error updating post", status: res.status, data: null };
  }

  const data = await res.json();

  revalidatePath("/dashboard/posts");

  return { error: null, status: res.status, data };
}

export async function getPostBySlugAction(slug: string) {
  const res = await serverAuthFetchWithRefresh(`/posts/slug/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error fetching post by slug");
  }

  const data = await res.json();

  return data as Post;
}

export async function getAllPostsAction(postListQuery: PostListQuery) {
  const url = buildUrlWithParams("/posts", postListQuery);

  const res = await serverAuthFetchWithRefresh(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error fetching all posts");
  }


  const data = await res.json();

  return data as PagedResult<Post>;
}

// ===================== Favorite Posts Actions =====================
export async function addPostToFavorites(postId: string) {
  const res = await serverAuthFetchWithRefresh("/post-favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId }),
  });

  if (!res.ok) {
    throw new Error("Error adding post to favorites");
  }

  revalidatePath("/dashboard/favorites");
  return true;
}

export async function removePostFromFavorites(postId: string) {
  const res = await serverAuthFetchWithRefresh('/post-favorites', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId }),
  });
  if (!res.ok) {
    console.log(await res.json());
    throw new Error("Error removing post from favorites");
  }

  return true;
}

export async function getFavoritePostsByUser({ take, cursor }: { take?: number; cursor?: string } = {}) {

  const url = buildUrlWithParams('/post-favorites', { take, cursor });

  const res = await serverAuthFetchWithRefresh(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error fetching favorite posts");
  }

  const data = await res.json();

  return data as { items: Post[]; nextCursor: string | null};
}

// Likes
export async function addPostToLikesAction(postId: string) {
  const res = await serverAuthFetchWithRefresh(`${URL_POSTS_LIKE}/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error adding post to favorites");
  }

  return await res.json();
}

export async function removePostFromLikesAction(postId: string) {
  const res = await serverAuthFetchWithRefresh(`${URL_POSTS_LIKE}/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error removing post from likes");
  }

  return await res.json();
}