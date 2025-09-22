"use client";
import React from "react";
import PostsListClient from "@/components/posts/posts-list-client";
import { PostListQuery } from "@/interfaces";


const query: PostListQuery = {
  publishedOnly: true,
  visibility: "PUBLIC",
  includes: ["author", "favorites"],
  take: 10,
  sortBy: "publishedAt",
  order: "desc",
};

export default function PostList() {
  return (<PostsListClient initialQuery={query} />)
}
