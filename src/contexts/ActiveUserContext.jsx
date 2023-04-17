import { createContext, useState } from "react";

export const ActiveUserContext = createContext();

export const ActiveUserContextProvider = ({children}) => {
    const [activeUser, setActiveUser] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return <ActiveUserContext.Provider value={{activeUser, setActiveUser, isLoggedIn, setIsLoggedIn}}>
        {children}
    </ActiveUserContext.Provider>
}