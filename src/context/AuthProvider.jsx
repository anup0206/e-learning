import React, { createContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";



 const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error("Failed to parse user from local storage", error);
            return null;
        }
    });

    const signin = (logintoken, userDetails) => {
        console.log("Logging in with:", logintoken, userDetails);
        setToken(logintoken);
        setUser(userDetails);
        localStorage.setItem("token", logintoken);
        localStorage.setItem("user", JSON.stringify(userDetails));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.clear();
    };

    // Sync localStorage on change
    useEffect(() => {
        if (token && user) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }, [token, user]);

    return (
        <AuthContext.Provider value={{ token, user, signin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
