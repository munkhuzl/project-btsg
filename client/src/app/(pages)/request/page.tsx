"use server";

import RequestPage from "@/components/request";
import { MyRequest } from "@/components/myrequest";

const Page = () => {
  return (
    <div>
      <RequestPage />;
      <MyRequest />
    </div>
  );
};
export default Page;
