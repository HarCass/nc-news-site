import { useEffect, useState } from "react"
import { getUserbyId } from "../api";
import { User } from "../types";
import { ApiErrorResponse, ApiError } from "../types";
import { Nullable } from "vitest";

const useUser = (id: string) => {
    const [userData, setUserData] = useState<User>();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<Nullable<ApiError>>(null);

    useEffect(() => {
        setIsLoading(true);
        getUserbyId(id)
        .then(data => setUserData(data))
        .catch((err: ApiErrorResponse) => setIsError(err.response))
        .finally(() => setIsLoading(false));
    }, [])

    return { userData, isLoading, isError };
}

export default useUser;