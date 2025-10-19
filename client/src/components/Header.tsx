'use client';

import { CircleUserRound } from "lucide-react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {useAuth} from "@/context/AuthProvider";
import Link from "next/link";

export function Header() {
    const {isAuth, user, logout} = useAuth();
    return (
        <header className="border-b bg-white">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-gray-900">Биеийн тамир спортын газар</h1>
                        <p className="text-sm text-gray-500">Цаг бүртгэл</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {isAuth ? <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="gap-2">
                                <CircleUserRound className="md:hidden sm:block w-8 h-8"/>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm">{user?.email}</p>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 px-3 py-2 space-y-2 rounded-md">
                            <DropdownMenuItem>
                                <Link href='/request'>Миний бүртгэл</Link></DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/login" onClick={()=>logout()}>Гарах</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> : <Link href="/login">Нэвтрэх</Link>}

                </div>
            </div>
        </header>
    );
}
