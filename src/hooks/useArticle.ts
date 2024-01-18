import { getArticleById } from "../api";
import { useQuery } from "@tanstack/react-query";

const useArticle = (id: number) => {
    return useQuery({
        queryKey: [`article${id}`, id],
        queryFn: () => getArticleById(id),
        staleTime: 1000 * 60 * 5
    })
}

export default useArticle;