import { useEffect, useState } from "react";
import { getArticleById } from "../api";
import { Article } from "../types";
import { ApiErrorResponse, ApiError } from "../types";
import { Nullable } from "vitest";

const useArticle = (id: number) => {
    const [articleData, setArticleData] = useState<Article>();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<Nullable<ApiError>>(null);

    useEffect(() => {
        setIsLoading(true);
        getArticleById(id)
        .then(data => {
            setArticleData(data);
            setIsError(null);
        })
        .catch((err: ApiErrorResponse) => setIsError(err.response))
        .finally(() => setIsLoading(false));
    }, []);

    return { articleData, isLoading, isError };
}

export default useArticle;