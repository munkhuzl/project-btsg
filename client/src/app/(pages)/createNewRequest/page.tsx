"use client";

import { CreateNewRequest } from "@/components/createNewRequest";
import {useAuth} from "@/context/AuthProvider";
import {useGetUserQuery} from "@/generated";

const Page = () => {
  const { isAuth } = useAuth();
  const token = localStorage.getItem('token');

  const { data: userData } = useGetUserQuery({
    skip: !token,
    context: {
      headers: {
        authorization: token || '',
      },
    },
  });
  console.log(isAuth, token, userData);

  return <CreateNewRequest user={userData || 's'} />;
};

export default Page;
