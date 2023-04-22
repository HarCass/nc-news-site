import { useEffect, useState } from "react"
import { getUserCommentsById } from "../api";

const useUserComments = (id) => {
    const [commentsData, setCommentsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getUserCommentsById(id)
        .then(data => setCommentsData(data))
        .catch(err => setIsError(err.response))
        .finally(() => setIsLoading(false));
    }, []);

    return { commentsData, isLoading, isError };
}

export default useUserComments;