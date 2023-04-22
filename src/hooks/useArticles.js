import { useEffect, useState } from "react";
import { getArticles } from "../api";

const useArticles = ({page, topic, sortBy, order, limit}) => {
    const [articlesData, setArticlesData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getArticles(page, topic, sortBy, order, limit)
        .then(({articles, total_count}) => {
            setArticlesData(articles);
            setTotalPages(Math.ceil(total_count / 10));
            setIsError(null);
        })
        .catch(err => setIsError(err.response))
        .finally(() => setIsLoading(false));
    }, [page, topic, sortBy, order, limit]);

    return { articlesData, totalPages, isLoading, isError };

}

export default useArticles;