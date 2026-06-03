'use client';

import { CircleUserRound, LayoutGrid, FileText } from "lucide-react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
    const { isAuth, user, logout } = useAuth();
    const pathname = usePathname();

    return (
        <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div>
                            <h1 className="text-zinc-950 font-bold tracking-tight group-hover:text-zinc-800 transition-colors uppercase">БИЕИЙН ТАМИР, СПОРТЫН ГАЗАР</h1>
                            <p className="text-xs text-zinc-500 font-medium">Цаг бүртгэл Админ систем</p>
                        </div>
                    </Link>

                    {isAuth && (
                        <nav className="hidden md:flex items-center gap-1 bg-zinc-50 p-1 rounded-xl border border-zinc-150">
                            <Link 
                                href="/request" 
                                className={`text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                                    pathname === "/request" || pathname === "/" 
                                        ? "bg-white text-zinc-950 shadow-sm" 
                                        : "text-zinc-500 hover:text-zinc-800"
                                }`}
                            >
                                <FileText className="size-3.5" /> Хүсэлтүүд
                            </Link>
                            <Link 
                                href="/templates" 
                                className={`text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                                    pathname === "/templates" 
                                        ? "bg-white text-zinc-950 shadow-sm" 
                                        : "text-zinc-500 hover:text-zinc-800"
                                }`}
                            >
                                <LayoutGrid className="size-3.5" /> Форм зохиох
                            </Link>
                        </nav>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {isAuth ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="gap-2 focus:ring-0 focus-visible:ring-0">
                                    <CircleUserRound size={22} className="text-zinc-700" />
                                    <div className="hidden sm:block text-left select-none">
                                        <p className="text-xs font-semibold text-zinc-800">{user?.email}</p>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 bg-white border border-zinc-150 p-1 rounded-xl shadow-xl mt-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                                <DropdownMenuItem className="focus:outline-none">
                                    <Link href='/request' className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 rounded-lg transition-colors w-full">
                                        <FileText className="size-3.5" /> Хүсэлтүүд
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:outline-none">
                                    <Link href='/templates' className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 rounded-lg transition-colors w-full">
                                        <LayoutGrid className="size-3.5" /> Форм зохиох
                                    </Link>
                                </DropdownMenuItem>
                                <div className="border-t border-zinc-100 my-1" />
                                <DropdownMenuItem className="focus:outline-none">
                                    <Link 
                                        href="/login" 
                                        onClick={() => logout()} 
                                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-650 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors w-full"
                                    >
                                        Гарах
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login" className="text-xs font-semibold text-zinc-700 hover:text-zinc-950">Нэвтрэх</Link>
                    )}
                </div>
            </div>
        </header>
    );
}
