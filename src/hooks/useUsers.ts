import { getUsers } from "../api";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers(),
        staleTime: 1000 * 60 * 5
    })
}

export default useUsers;