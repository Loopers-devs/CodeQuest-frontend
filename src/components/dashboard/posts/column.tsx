"use client";

import { Link } from "@/i18n/navigation";
import { Post, PostStatus, PostVisibility } from "@/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
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
        const statusVariant: Record<PostStatus, 'success' | 'warning' | 'destructive' | 'muted'> = {
          DRAFT: 'warning',
          PUBLISHED: 'success',
          ARCHIVED: 'muted',
        };

        return (
          <Badge variant={statusVariant[v]}>
            {getStatusLabel(translations, v)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "visibility",
      header: () => translations.columns.visibility,
      cell: ({ getValue }) => {
        const v = getValue() as PostVisibility;
        const visibilityVariant: Record<PostVisibility, 'success' | 'warning' | 'muted' | 'info'> = {
          PUBLIC: 'success',
          MEMBERS: 'warning',
          PRIVATE: 'muted',
        };

        return (
          <Badge variant={visibilityVariant[v]}>
            {getVisibilityLabel(translations, v)}
          </Badge>
        );
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
