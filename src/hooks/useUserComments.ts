import { useEffect, useState } from "react"
import { getUserCommentsById } from "../api";
import { Comment, ApiError, ApiErrorResponse } from "../types";
import { Nullable } from "vitest";

const useUserComments = (id: string) => {
    const [commentsData, setCommentsData] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<Nullable<ApiError>>(null);

    useEffect(() => {
        setIsLoading(true);
        getUserCommentsById(id)
        .then(data => setCommentsData(data))
        .catch((err: ApiErrorResponse) => setIsError(err.response))
        .finally(() => setIsLoading(false));
    }, []);

    return { commentsData, isLoading, isError };
}

export default useUserComments;