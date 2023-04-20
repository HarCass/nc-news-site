import { useEffect, useState } from "react";
import { getArticles } from "../api";

const useArticles = (page, topic, sortBy, order) => {
    const [articlesData, setArticlesData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getArticles(page, topic, sortBy, order)
        .then(({articles, total_count}) => {
            setArticlesData(articles)
            setTotalPages(Math.ceil(total_count / 10));
        })
        .finally(() => setIsLoading(false));
    }, [page, topic, sortBy, order]);

    return { articlesData, totalPages, isLoading };

}

export default useArticles;