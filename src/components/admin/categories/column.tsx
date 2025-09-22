"use client";
import { Link } from "@/i18n/navigation";
import { Category } from "@/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon } from "lucide-react";

export type CategoriesTranslations = {
  columns: {
    name: string;
    description: string;
    posts: string;
    actions: string;
  };
};

// Export a factory that receives a plain translations object and returns columns.
export const createColumns = (
  translations: CategoriesTranslations
): ColumnDef<Category>[] => {
  return [
    {
      accessorKey: "name",
      header: () => translations.columns.name,
      cell: ({ row }) => {
        const cat = row.original;
        return (
          <Link href={`/dashboard/categories/${cat.id}/edit`} className="text-primary underline">
            {cat.name}
          </Link>
        );
      },
    },
    {
      accessorKey: "description",
      header: () => translations.columns.description,
      cell: ({ getValue }) => {
        return <span>{(getValue() as string) ?? "-"}</span>;
      },
    },
    {
      id: "posts",
      header: () => translations.columns.posts,
      accessorFn: (row) => row.posts?.length ?? 0,
      cell: ({ getValue }) => <span>{getValue() as number}</span>,
    },
    {
      id: "actions",
      header: () => translations.columns.actions,
      cell: ({ row }) => {
        const cat = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <EllipsisVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/categories/${cat.id}/edit`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => console.log("delete", cat.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
