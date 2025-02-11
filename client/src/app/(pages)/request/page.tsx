"use server";

import MyRequest from "@/components/myrequest";
import RequestPage from "@/components/request";

const Page = () => {
  return (
    <div>
      <RequestPage />;
      <MyRequest />
    </div>
  );
};
export default Page;
