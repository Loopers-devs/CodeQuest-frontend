import { profileAction } from "@/actions/user.action";
import { useQuery } from "@tanstack/react-query"

export const useUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => profileAction(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: false,
    });
}