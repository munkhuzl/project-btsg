'use client';

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useApolloClient} from "@apollo/client";
import {toast} from "react-toastify";
import {useGetUserQuery} from "@/generated";

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
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuth, setAuth] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const client = useApolloClient();

    // Get user data query
    const { data: userData } = useGetUserQuery({
        skip: !isAuth || !token,
        context: {
            headers: {
                authorization: token || '',
            },
        },
    });

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setAuth(true);
        }
    }, []);

    // Update user data when query completes
    useEffect(() => {
        if (userData?.getUser && userData.getUser.length > 0) {
            setUser(userData.getUser[0]);
        }
    }, [userData]);

    const logout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('order');
        setAuth(false);
        setUser(null);
        setToken(null);
        await client.resetStore().then(() => toast.success(`Account logged out`));
    };

    return <AuthContext.Provider value={{ isAuth, user, token, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
