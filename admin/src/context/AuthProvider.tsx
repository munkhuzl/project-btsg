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
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const client = useApolloClient();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // Apollo query: fetch user only if we have a valid userId
    const { data, loading, error } = useGetUserQuery();

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
        setIsLoading(loading);
    }, [data, loading]);

    // Handle query errors gracefully
    useEffect(() => {
        if (error) {
            console.error("Error fetching user:", error);
            toast.error("Failed to load user data.");
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
        <AuthContext.Provider value={{ isAuth, user, token, isLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
