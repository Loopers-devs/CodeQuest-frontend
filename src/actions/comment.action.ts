"use server";
import { CommentListQuery, PageResponse, Comment } from "@/interfaces"
import { buildUrlWithParams } from "@/lib/build-url-with-params"
import { serverAuthFetchWithRefresh } from "@/lib/serverAuthFetch"

const BASE_URL = "/post-comments"

export const getCommentsByPostId = async (query:CommentListQuery) => {

    const url = buildUrlWithParams(BASE_URL, { ...query })
    

    const res = await serverAuthFetchWithRefresh(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Error fetching comments")
    }

    return await res.json() as PageResponse<Comment>
}

export const createComment = async (body: { postId: string; content: string; parentId?: string }) => {
    const res = await serverAuthFetchWithRefresh(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error("Error creating comment")
    }

    return await res.json() as Comment
}