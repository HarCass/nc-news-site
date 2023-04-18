import { useEffect, useState } from "react";
import { getArticleById } from "../api";

const useArticle = (id) => {
    const [articleData, setArticleData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getArticleById(id)
        .then(data => setArticleData(data))
        .finally(() => setIsLoading(false));
    }, [])

    return { articleData, isLoading };

}

export default useArticle;