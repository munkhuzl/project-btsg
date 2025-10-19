"use server";

import Allrequests from "@/components/allrequests";
import RequestPage from "@/components/request";

const Page = () => {
  return (
    <div>
      <RequestPage />;
      <Allrequests />
    </div>
  );
};
export default Page;
