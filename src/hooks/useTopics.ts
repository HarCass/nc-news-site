import { useEffect, useState } from "react"
import { getTopics } from "../api";
import { Topic } from "../types";

const useTopics = () => {
    const [topicsData, setTopicsData] = useState<Topic[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getTopics()
        .then(data => setTopicsData(data))
        .finally(() => setIsLoading(false));
    }, []);

    return { topicsData, setTopicsData, isLoading };
}

export default useTopics;