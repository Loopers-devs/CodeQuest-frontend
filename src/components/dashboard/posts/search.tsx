"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { PostStatus, PostVisibility } from "@/interfaces";
import { useTranslations } from "next-intl";
import { getStringParam, getEnumParam, paramToSelectValue } from "@/lib/url";

export default function PostsSearch() {
  const t = useTranslations("dashboard.posts");
  const placeholder = t("filters.searchPlaceholder");
  const statusLabel = t("filters.statusLabel");
  const visibilityLabel = t("filters.visibilityLabel");
  const allLabel = t("filters.all");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const ALL_VALUE = "__ALL__";

  const initialSearch = useMemo(
    () =>
      getStringParam(new URLSearchParams(searchParams.toString()), "search") ??
      "",
    [searchParams]
  );

  const initialStatus = useMemo(
    () =>
      paramToSelectValue(
        getEnumParam(
          new URLSearchParams(searchParams.toString()),
          "status",
          PostStatus
        ),
        ALL_VALUE
      ),
    [searchParams]
  );

  const initialVisibility = useMemo(
    () =>
      paramToSelectValue(
        getEnumParam(
          new URLSearchParams(searchParams.toString()),
          "visibility",
          PostVisibility
        ),
        ALL_VALUE
      ),
    [searchParams]
  );

  const [inputValue, setInputValue] = useState(initialSearch);

  const setParam = useCallback(
    (
      updates: Record<string, string | null>,
      opts: { resetPage?: boolean; replace?: boolean } = {
        resetPage: true,
        replace: true,
      }
    ) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([k, v]) => {
        if (v == null || v.trim?.() === "") params.delete(k);
        else params.set(k, v);
      });
      if (opts.resetPage) params.set("page", "1");
      const url = `${pathname}?${params.toString()}`;
      const nav = opts.replace ? router.replace : router.push;
      nav(url, { scroll: false });
    },
    [router, pathname, searchParams]
  );
  const handleClickSearch = () => {
    // Sin debounce cuando se hace click en el botón de búsqueda
    const normalized = inputValue.trim();
    setParam({ search: normalized === "" ? null : normalized });
  };

  const handleSettingSelect = (
    param: "status" | "visibility" | "search",
    value: string
  ) => {
    setParam({ [param]: value === ALL_VALUE ? null : value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.trim() === "") {
      handleSettingSelect("search", "");
    }

    setInputValue(value);
  };

  return (
    <div className="mb-4 flex justify-between flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative w-full max-w-md">
        <Input
          placeholder={placeholder}
          className="w-full pr-10"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button
          size="icon"
          className="rounded-l-none absolute top-0 right-0"
          onClick={handleClickSearch}
        >
          <SearchIcon />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:flex md:items-center md:gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">{statusLabel}</span>
          <Select
            value={initialStatus}
            onValueChange={(v) => handleSettingSelect("status", v)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder={allLabel} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={ALL_VALUE}>{allLabel}</SelectItem>
                {Object.values(PostStatus).map((s) => (
                  <SelectItem key={s} value={s}>
                    {t(`status.${s}`)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">{visibilityLabel}</span>
          <Select
            value={initialVisibility}
            onValueChange={(v) => handleSettingSelect("visibility", v)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder={allLabel} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={ALL_VALUE}>{allLabel}</SelectItem>
                {Object.values(PostVisibility).map((v) => (
                  <SelectItem key={v} value={v}>
                    {t(`visibility.${v}`)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
