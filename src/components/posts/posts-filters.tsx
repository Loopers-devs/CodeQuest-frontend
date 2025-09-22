"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { useTranslations } from "next-intl";

interface PostsFiltersProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function PostsFilters({ searchParams }: PostsFiltersProps) {
  const t = useTranslations("posts");
  const router = useRouter();

  const [search, setSearch] = useState((searchParams.search as string) || "");
  const [sortBy, setSortBy] = useState((searchParams.sortBy as string) || "publishedAt");
  const [order, setOrder] = useState((searchParams.order as string) || "desc");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search.trim());
    if (sortBy !== "publishedAt") params.set("sortBy", sortBy);
    if (order !== "desc") params.set("order", order);

    // Remove cursor when applying new filters
    const newUrl = params.toString() ? `?${params.toString()}` : "";
    router.push(newUrl);
  };

  const handleClear = () => {
    setSearch("");
    setSortBy("publishedAt");
    setOrder("desc");
    router.push("");
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          {t("filters")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("search")}
              </label>
              <Input
                placeholder={t("searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("sortBy")}
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="publishedAt">
                    {t("publishedAt")}
                  </SelectItem>
                  <SelectItem value="views">
                    {t("views")}
                  </SelectItem>
                  <SelectItem value="reactionsCount">
                    {t("reactions")}
                  </SelectItem>
                  <SelectItem value="commentsCount">
                    {t("comments")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Order */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("order")}
              </label>
              <Select value={order} onValueChange={setOrder}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">
                    <div className="flex items-center gap-2">
                      <SortDesc className="h-4 w-4" />
                      {t("descending")}
                    </div>
                  </SelectItem>
                  <SelectItem value="asc">
                    <div className="flex items-center gap-2">
                      <SortAsc className="h-4 w-4" />
                      {t("ascending")}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <label className="text-sm font-medium opacity-0">Actions</label>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {t("applyFilters") || "Aplicar"}
                </Button>
                <Button type="button" variant="outline" onClick={handleClear}>
                  {t("clearFilters") || "Limpiar"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}