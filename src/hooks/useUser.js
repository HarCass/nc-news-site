import { useEffect, useState } from "react"
import { getUserbyId } from "../api";

const useUser = (id) => {
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getUserbyId(id)
        .then(data => setUserData(data))
        .catch(err => setIsError(err.response))
        .finally(() => setIsLoading(false));
    }, [])

    return { userData, isLoading, isError };
}

export default useUser;