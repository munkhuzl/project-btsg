"use client";

import { TemplateBuilder } from "@/components/TemplateBuilder";
import { useAuth } from "@/context/AuthProvider";

const Page = () => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return (
      <div className="py-24 text-center text-zinc-500 font-medium text-sm">
        Админ системд нэвтэрнэ үү.
      </div>
    );
  }

  return (
    <div className="py-12 bg-zinc-50/50 min-h-screen">
      <TemplateBuilder />
    </div>
  );
};

export default Page;
