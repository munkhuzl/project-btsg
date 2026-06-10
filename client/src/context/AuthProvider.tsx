'use client';

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
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
    const { data, loading, error, refetch } = useGetUserQuery({
        skip: !token,
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
    });

    // getUser takes no variables (the user id comes from the auth header), so
    // when the token changes from one truthy value to another (e.g. a stale or
    // expired token to a fresh login token) Apollo sees identical variables and
    // does NOT refetch. Force a refetch on every token change so the freshly
    // logged-in user is actually loaded instead of having to log in twice.
    const tokenRef = useRef(token);
    useEffect(() => {
        if (token && token !== tokenRef.current) refetch();
        tokenRef.current = token;
    }, [token, refetch]);

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
        if (error && !loading) {
            console.error("Error fetching user:", error);
            const msg = error.message?.toLowerCase() ?? "";
            const isAuthError = msg.includes("logged in") || msg.includes("unauthor") || msg.includes("token");
            if (isAuthError) {
                if (typeof window !== "undefined") localStorage.removeItem("token");
                setToken(null);
                setIsAuth(false);
                setUser(null);
            }
            // Don't flip auth state on transient/network errors — that bounces a
            // just-logged-in user back to /login.
            setIsLoading(false);
        }
    }, [error, loading]);

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
