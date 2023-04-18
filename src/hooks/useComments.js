import { useEffect, useState } from "react";
import { getArticleCommentsById } from "../api";

const useComments = (id, limit) => {
    const [commentsData, setCommentsData] = useState([]);
    const [totalComments, setTotalComments] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setIsLoading(true);
        getArticleCommentsById(id, limit)
        .then(data => {
            setCommentsData(data.comments);
            setTotalComments(data.total_count);
        })
        .then(() => setIsLoading(false));
    }, [limit])
    
    return { commentsData, totalComments, isLoading };
}

export default useComments;