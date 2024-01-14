import { useEffect, useState } from "react";
import { getArticleCommentsById } from "../api";
import { Comment } from "../types";
import { Nullable } from "vitest";

const useComments = (id: number, limit: Nullable<number | 'all'>) => {
    const [commentsData, setCommentsData] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setIsLoading(true);
        getArticleCommentsById(id, limit)
        .then(data => {
            setCommentsData(data.comments);
        })
        .finally(() => setIsLoading(false));
    }, [limit])
    
    return { commentsData, setCommentsData, isLoading };
}

export default useComments;