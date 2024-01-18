import { getTopics } from "../api";
import { useQuery } from "@tanstack/react-query";

const useTopics = () => {
    return useQuery({
        queryKey: ["topics"],
        queryFn: () => getTopics(),
        staleTime: 1000 * 60 * 5
    })
}

export default useTopics;