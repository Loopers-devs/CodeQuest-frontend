"use server";
import { Category, CategoryListQuery } from "@/interfaces";
import { serverAuthFetchWithRefresh } from "@/lib/serverAuthFetch";

export async function getAllCategoriesAction(searchParams?: CategoryListQuery) {
  const url = buildUrlWithParams("/categories", searchParams);

  const res = await serverAuthFetchWithRefresh(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error fetching all categories");
  }

  const data = await res.json();

  return data as {
    items: Category[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

const buildUrlWithParams = (baseUrl: string, paramsObj?: CategoryListQuery) => {
  const params = new URLSearchParams();

  Object.entries(paramsObj ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    params.append(key, String(value));
  });

  const queryString = params.toString();

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
