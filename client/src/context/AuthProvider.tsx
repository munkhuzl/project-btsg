'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { toast } from "react-toastify";
import { useGetUserQuery } from "@/generated";

export interface User {
    _id: string;
    email: string;
    firstname?: string | null;
    lastname?: string | null;
    phoneNumber?: string | null;
    position?: string | null;
    workPlace?: {
        city?: string | null;
        state?: string | null;
        company_name?: string | null;
        principal_name?: string | null;
    } | null;
    school?: {
        city?: string | null;
        state?: string | null;
        school_number?: string | null;
        class?: string | null;
    } | null;
}

export interface AuthContextValue {
    isAuth: boolean;
    user: User | null;
    token: string | null;
    isLoading: boolean;
    setToken: (token: string | null) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState<string | null>(() => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem("token");
    });

    const client = useApolloClient();

    const updateToken = (next: string | null) => {
        if (typeof window !== "undefined") {
            if (next) localStorage.setItem("token", next);
            else localStorage.removeItem("token");
        }
        setToken(next);
    };

    // Apollo query: fetch user only if we have a valid userId
    const { data, loading, error } = useGetUserQuery({skip: !token});
    // Handle authentication state
    useEffect(() => {
        if (token) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
            setUser(null);
        }
    }, [token]);

    // Update user data when query completes
    useEffect(() => {
        if (data?.getUser) {
            setUser(data.getUser);
        }
        // Only "loading" while we have a token and the query is still running.
        // No token = definitively unauthenticated, not loading.
        setIsLoading(!!token && loading);
    }, [data, loading, token]);

    // Handle query errors gracefully
    useEffect(() => {
        if (error) {
            console.error("Error fetching user:", error);
            const msg = error.message?.toLowerCase() ?? "";
            const isAuthError = msg.includes("logged in") || msg.includes("unauthor") || msg.includes("token");
            if (isAuthError) {
                if (typeof window !== "undefined") localStorage.removeItem("token");
                setToken(null);
            } else {
                toast.error("Failed to load user data.");
            }
            setIsAuth(false);
            setUser(null);
            setIsLoading(false);
        }
    }, [error]);

    const logout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("order");
        setIsAuth(false);
        setUser(null);
        setIsLoading(false);
        await client.resetStore();
        toast.success("Logged out successfully");
    };

    return (
        <AuthContext.Provider value={{ isAuth, user, token, isLoading, setToken: updateToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
