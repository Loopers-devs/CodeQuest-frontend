"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
    currentPage: number;
    totalPages: number;
}

export function Pagination({ currentPage, totalPages }: Props) {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

    const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

    return (
        <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-600">
                Página {currentPage} de {totalPages}
            </span>
            <div className="ml-4 space-x-2">
                <Button
                    disabled={currentPage <= 1}
                    onClick={() => {
                        const queryString = createQueryString('page', (currentPage - 1).toString())
                        router.push(`${pathname}?${queryString}`)
                    }}
                >
                    <ArrowLeft />
                </Button>

                <Button
                    disabled={currentPage >= totalPages}
                    onClick={() => {
                        const queryString = createQueryString('page', (currentPage + 1).toString())
                        router.push(`${pathname}?${queryString}`)
                    }}
                >
                    <ArrowRight />
                </Button>
            </div>
        </div>
    )
}