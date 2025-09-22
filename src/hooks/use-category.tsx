import { getAllCategoriesAction } from "@/actions/category.action";
import { CategoryListQuery } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";

export const useCategories = (categoryListQuery: CategoryListQuery = {}) => {
  return useQuery({
    queryKey: ["categories", categoryListQuery],
    queryFn: () => getAllCategoriesAction(categoryListQuery),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
