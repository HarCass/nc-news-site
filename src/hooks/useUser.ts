import { getUserbyId } from "../api";
import { useQuery } from "@tanstack/react-query";

const useUser = (id: string) => {
    return useQuery({
        queryKey: [`user${id}`, id],
        queryFn: () => getUserbyId(id),
        staleTime: 1000 * 60 * 5
    })
}

export default useUser;