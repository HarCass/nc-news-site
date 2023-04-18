import { useEffect, useState } from "react";
import { getArticleCommentsById } from "../api";

const useComments = (id) => {
    const [commentsData, setCommentsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setIsLoading(true);
        getArticleCommentsById(id)
        .then(data => setCommentsData(data))
        .then(() => setIsLoading(false));
    }, [])
    
    return { commentsData, isLoading };
}

export default useComments;