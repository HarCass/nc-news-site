import { getUserCommentsById } from "../api";
import { useQuery } from "@tanstack/react-query";

const useUserComments = (id: string) => {
    return useQuery({
        queryKey: [`${id}Comments`, id],
        queryFn: () => getUserCommentsById(id),
        staleTime: 1000 * 60 * 5
    })
}

export default useUserComments;