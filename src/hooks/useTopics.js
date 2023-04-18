import { useEffect, useState } from "react"
import { getTopics } from "../api";

const useTopics = () => {
    const [topicsData, setTopicsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getTopics()
        .then(data => setTopicsData(data))
        .finally(() => setIsLoading(false));
    }, []);

    return { topicsData, isLoading };
}

export default useTopics;