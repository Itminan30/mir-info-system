/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({children});
export const AuthProvider = () => {
    const [user, setUser] = useState(null);
    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);