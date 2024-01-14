import { getArticles } from "../api";
import { ArticlesParams } from "../types";
import { useQuery } from "@tanstack/react-query";

const useArticles = ({page, topic, sortBy, order, limit}: ArticlesParams) => {
    return useQuery({
        queryKey: ['articlesRes', page, topic, sortBy, order],
        queryFn: () => getArticles(page, topic, sortBy, order, limit),
        staleTime: 1000 * 60 * 5
    });
}

export default useArticles;