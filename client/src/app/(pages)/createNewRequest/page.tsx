"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreateNewRequest } from "@/components/createNewRequest";
import { useAuth } from "@/context/AuthProvider";

const Page = () => {
  const { isAuth, user, isLoading, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !token && !isAuth) {
      router.replace("/login");
    }
  }, [isLoading, token, isAuth, router]);

  if (isLoading || (token && !user)) {
    return <div className="w-full mx-auto text-center">Уншиж байна...</div>;
  }

  if (!user || !isAuth) {
    return null;
  }

  return <CreateNewRequest user={user} />;
};

export default Page;
