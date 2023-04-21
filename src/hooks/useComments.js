import { useEffect, useState } from "react";
import { getArticleCommentsById } from "../api";

const useComments = (id, limit) => {
    const [commentsData, setCommentsData] = useState([]);
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