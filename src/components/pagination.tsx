"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CustomButton from "./custom-button";

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

interface CustomPaginationProps {
    hasPrev: boolean;
    isFetching: boolean;
    totalPages: number;
    hasNext: boolean;

    handlePrevious: () => void;
    handleNext: () => void;
}

export const CustomPagination = ({
  hasPrev,
  isFetching,
  handlePrevious,
  handleNext,
  hasNext,
}: CustomPaginationProps) => {
  return (
    <div className="flex items-center justify-end mt-4 space-x-2">
      <CustomButton onClick={handlePrevious} disabled={!hasPrev || isFetching}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Anterior
      </CustomButton>
      <CustomButton onClick={handleNext} disabled={!hasNext || isFetching}>
        Siguiente
        <ArrowRight className="ml-2 h-4 w-4" />
      </CustomButton>
    </div>
  );
}