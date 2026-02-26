'use client';

import { CircleUserRound } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";

export function Header() {
  const { isAuth, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout(); // async logout
    window.location.href = "/login";
  };

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo / Title */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-gray-900 font-semibold text-lg md:text-xl">
              Биеийн тамир спортын газар
            </h1>
            <p className="text-sm text-gray-500">Чөлөөний хуудас</p>
          </div>
        </div>

        {/* User / Auth */}
        <div className="flex items-center gap-4">
          {isAuth ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 rounded-md transition"
                >
                  {/* Icon visible on mobile */}
                  <CircleUserRound className="md:hidden w-8 h-8" />
                  {/* Email visible on desktop */}
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.email}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 bg-white border border-gray-200 px-3 py-2 space-y-1 rounded-md shadow-md"
              >
                <DropdownMenuItem className="hover:bg-gray-100 rounded-md transition">
                  <Link href="/request" className="w-full block">
                    Миний чөлөө
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="hover:bg-gray-100 rounded-md transition cursor-pointer"
                  onClick={handleLogout}
                >
                  Гарах
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Нэвтрэх
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}