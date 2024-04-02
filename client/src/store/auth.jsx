import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState("");
    const [services, setServices] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const authorizationToken = `Bearer ${token}`

    const API = import.meta.env.VITE_APP_URI_API;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem("token", serverToken);
    };

    let isLoggedIn = !!token;
    console.log("isLoggedIn" + isLoggedIn, token)

    // tackling the logout functionality
    const LogoutUser = () => {
        setToken('')
        return localStorage.removeItem("token")
    }

    // function to check the user authentication or not

    const userAuthentication = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("user data: ", data);
                setUser(data);
            }
            else {
                console.error("Error fetching user data");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getServices = async () => {
        try {
            const response = await fetch(`${API}/api/data/service`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.msg);
                setServices(data.msg);
                setIsLoading(false)
            }
            else {
                setIsLoading(false);
            }

        } catch (error) {
            console.log(`services fronted error: ${error}`);
        }
    }


    useEffect(() => {
        getServices();
        userAuthentication();
    }, [])

    return <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken, isLoading, API }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider")
    }
    return authContextValue;
}