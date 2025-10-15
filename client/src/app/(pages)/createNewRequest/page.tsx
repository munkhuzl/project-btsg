"use client";

import { CreateNewRequest } from "@/components/createNewRequest";
import {useAuth} from "@/context/AuthProvider";
import {toast} from "react-toastify";

const Page = () => {
  const { isAuth, user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user || !isAuth) {
    toast.error('User must be logged in to sent request');
    return
  }

  return <CreateNewRequest user={user} />;
};

export default Page;
