import { PropsWithChildren, createContext, useState } from "react";
import { Nullable } from "vitest";
import { UserContext } from "../types";

export const ActiveUserContext = createContext<UserContext | undefined>(undefined);

export const ActiveUserContextProvider = ({children}: PropsWithChildren) => {
    const [activeUser, setActiveUser] = useState<Nullable<string>>(localStorage.getItem('activeUser'));
    const [isLoggedIn, setIsLoggedIn] = useState(activeUser !== null);

    return <ActiveUserContext.Provider value={{activeUser, setActiveUser, isLoggedIn, setIsLoggedIn}}>
        {children}
    </ActiveUserContext.Provider>
}