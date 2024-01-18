import { getArticleCommentsById } from "../api";
import { Nullable } from "vitest";
import { useQuery } from "@tanstack/react-query";

const useComments = (id: number, limit: Nullable<number | 'all'>) => {
    return useQuery({
        queryKey: ["comments", id, limit],
        queryFn: () => getArticleCommentsById(id, limit),
        staleTime: 1000 * 60 * 5
    })
}

export default useComments;