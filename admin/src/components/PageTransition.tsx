"use client";

import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export const PageTransition = ({ children }: PropsWithChildren) => {
    const pathname = usePathname();
    return (
        <div key={pathname} className="page-transition">
            {children}
        </div>
    );
};
