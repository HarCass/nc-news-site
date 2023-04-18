import { useEffect, useState } from "react";
import { getArticles } from "../api";

const useTopic = (page, topic) => {
    const [articlesData, setArticlesData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getArticles(page, topic)
        .then(({articles, total_count}) => {
            setArticlesData(articles)
            setTotalPages(Math.ceil(total_count / 10));
        })
        .finally(() => setIsLoading(false));
    }, [page]);

    return { articlesData, totalPages, isLoading };
}

export default useTopic;