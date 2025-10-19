"use client";

import { CreateNewRequest } from "@/components/createNewRequest";
import {useAuth} from "@/context/AuthProvider";
import {toast} from "react-toastify";

const Page = () => {
  const { isAuth, user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="w-full mx-auto text-center">Уншиж байна...</div>;
  }
  
  if (!user || !isAuth) {
    toast.error('User must be logged in to sent request');
    return
  }

  return <CreateNewRequest user={user} />;
};

export default Page;
