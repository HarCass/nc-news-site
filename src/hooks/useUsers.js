import { useEffect, useState } from "react";
import { getUsers } from "../api";

const useUsers = () => {
    const [usersData, setUsersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getUsers()
        .then(data => setUsersData(data))
        .finally(() => setIsLoading(false));
    }, []);

    return { usersData, isLoading };
}

export default useUsers;