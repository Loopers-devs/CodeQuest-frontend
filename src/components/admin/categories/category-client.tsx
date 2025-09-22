"use client";
import React from "react";
import { DataTable } from "@/components/data-table";
import {
  createColumns,
  CategoriesTranslations,
} from "@/components/admin/categories/column";
import { useCategories } from "@/hooks/use-category";
import { CustomPagination } from "@/components/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CategoriesClient({
  translations,
}: {
  translations: CategoriesTranslations;
}) {
  const [page, setPage] = React.useState(1);
  const [pageSize] = React.useState(5);
  const [search, setSearch] = React.useState("");
  const { data, isFetching } = useCategories({page, pageSize, search});

  const cols = React.useMemo(() => createColumns(translations), [translations]);

  return (
    <>
      <div>
        
      </div>
      <DataTable columns={cols} data={data?.items || []} isLoading={isFetching} />{" "}
      <CustomPagination 
        hasPrev={data?.hasPrev || false}
        isFetching={isFetching}
        totalPages={data?.totalPages || 0}
        hasNext={data?.hasNext || false}
        handlePrevious={() => setPage((old) => Math.max(old - 1, 1))}
        handleNext={() => {
          if (!data?.hasNext) return;
          setPage((old) => old + 1);
        }}
      />
    </>
  );
}
