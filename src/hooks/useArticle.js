import { useEffect, useState } from "react";
import { getArticleById } from "../api";

const useArticle = (id) => {
    const [articleData, setArticleData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getArticleById(id)
        .then(data => {
            setArticleData(data);
            setIsError(null);
        })
        .catch(err => setIsError(err.response))
        .finally(() => setIsLoading(false));
    }, [])

    return { articleData, isLoading, isError };

}

export default useArticle;