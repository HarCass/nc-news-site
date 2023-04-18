import { createContext, useState } from "react";

export const ActiveUserContext = createContext();

export const ActiveUserContextProvider = ({children}) => {
    const [activeUser, setActiveUser] = useState(localStorage.getItem('activeUser'));
    const [isLoggedIn, setIsLoggedIn] = useState(activeUser !== null);

    return <ActiveUserContext.Provider value={{activeUser, setActiveUser, isLoggedIn, setIsLoggedIn}}>
        {children}
    </ActiveUserContext.Provider>
}