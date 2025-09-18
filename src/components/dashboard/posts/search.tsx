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
import React, { useCallback, useEffect, useRef, useState } from "react";
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

  const qParam = getStringParam(searchParams, "search");
  const statusParam = getEnumParam(searchParams, "status", PostStatus);
  const visibilityParam = getEnumParam(searchParams, "visibility", PostVisibility);

  const [q, setQ] = useState(qParam ?? "");
  const [status, setStatus] = useState<string>(paramToSelectValue(statusParam, ALL_VALUE));
  const [visibility, setVisibility] = useState<string>(paramToSelectValue(visibilityParam, ALL_VALUE));

  const timeoutRef = useRef<number | null>(null);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== ALL_VALUE) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      params.delete("page");
      return params.toString();
    },
    [searchParams]
  );
  useEffect(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      const qs = createQueryString("search", q.trim());
      router.push(`${pathname}?${qs}`);
    }, 300);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [q, createQueryString, pathname, router]);


  const onStatusChange = (value: string) => {
    setStatus(value);
    const qs = createQueryString("status", value);
    router.push(`${pathname}?${qs}`);
  };

  const onVisibilityChange = (value: string) => {
    setVisibility(value);
    const qs = createQueryString("visibility", value);
    router.push(`${pathname}?${qs}`);
  };


  // keep local state in sync with URL changes (e.g., back/forward)
  useEffect(() => {
    setQ(getStringParam(searchParams, "search") ?? "");
    setStatus(paramToSelectValue(getEnumParam(searchParams, "status", PostStatus), ALL_VALUE));
    setVisibility(paramToSelectValue(getEnumParam(searchParams, "visibility", PostVisibility), ALL_VALUE));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  return (
    <div className="mb-4 flex justify-between flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative w-full max-w-md">
        <Input
          placeholder={placeholder}
          className="w-full pr-10"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button size="icon" className="rounded-l-none absolute top-0 right-0" onClick={() => {
          const qs = createQueryString("search", q.trim());
          router.push(`${pathname}?${qs}`);
        }}>
          <SearchIcon />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:flex md:items-center md:gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">{statusLabel}</span>
          <Select value={status} onValueChange={onStatusChange}>
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
          <Select value={visibility} onValueChange={onVisibilityChange}>
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
