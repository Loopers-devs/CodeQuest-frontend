"use client";

import { Link } from "@/i18n/navigation";
import { Post, PostStatus, PostVisibility } from "@/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon } from "lucide-react";

export type PostsTranslations = {
  columns: {
    title: string;
    status: string;
    visibility: string;
    published: string;
    views: string;
    comments: string;
    reactions: string;
    actions: string;
  };
  status: Record<PostStatus, string>;
  visibility: Record<PostVisibility, string>;
};

const getStatusLabel = (translations: PostsTranslations, status: PostStatus) =>
  translations.status[status];
const getVisibilityLabel = (
  translations: PostsTranslations,
  visibility: PostVisibility
) => translations.visibility[visibility];

// Export a factory that receives a plain translations object and returns columns.
export const createColumns = (
  translations: PostsTranslations
): ColumnDef<Post>[] => {
  return [
    {
      accessorKey: "title",
      header: () => translations.columns.title,
      cell: ({ row }) => {
        const post = row.original;
        return (
          <Link
            href={`/dashboard/posts/${post.slug}/edit`}
            className="text-primary underline"
          >
            {post.title}
          </Link>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => translations.columns.status,
      cell: ({ getValue }) => {
        const v = getValue() as PostStatus;
        return (
          <Select defaultValue={v}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(PostStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {getStatusLabel(translations, status)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: "visibility",
      header: () => translations.columns.visibility,
      cell: ({ getValue }) => {
        const v = getValue() as PostVisibility;
        return (
                      <Select defaultValue={v}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                    Object.values(PostVisibility).map((visibility) => (
                      <SelectItem key={visibility} value={visibility}>
                        {getVisibilityLabel(translations, visibility)}
                      </SelectItem>
                    ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: "publishedAt",
      header: () => translations.columns.published,
      cell: ({ row }) => {
        const post = row.original;
        return <div>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '-'}</div>;
      },
    },
    {
      id: "actions",
      header: () => translations.columns.actions,
      cell: ({ row }) => {
        const post = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <EllipsisVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/posts/${post.slug}/edit`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => console.log('delete', post.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
