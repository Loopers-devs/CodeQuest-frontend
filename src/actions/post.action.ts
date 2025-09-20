"use server";
import { Post, PostListQuery } from "@/interfaces";
import { serverAuthFetchWithRefresh } from "@/lib/serverAuthFetch";
import { CreatePostSchema } from "@/schema/post";

export async function createPostAction(inputs: CreatePostSchema): Promise<{ error: string | null; status: number; data: Post | null }> {

    const res = await serverAuthFetchWithRefresh("/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
    });

    if (!res.ok) {
        return { error: 'Error creating post', status: res.status, data: null };
    }

    const data = await res.json();


    return { error: null, status: res.status, data };
}

export async function getPostsByUserAction(postListQuery: PostListQuery) {

    const { authorId, ...rest } = postListQuery;

    console.log({ rest })

    const url = `/posts/author/${authorId}`;

    const params = new URLSearchParams();

    Object.entries(rest).forEach(([key, value]) => {
        if (!value) return;
        
        params.append(key, String(value));
    })

    const queryString = params.toString();

    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const res = await serverAuthFetchWithRefresh(fullUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error('Error fetching posts');
    }

    const data = await res.json();

    return data as { items: Post[]; nextCursor: string | null  };
}