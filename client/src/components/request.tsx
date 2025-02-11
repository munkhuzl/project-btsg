"use client";

import { Calendar } from "./ui/calendar";


const RequestPage = () => {
  return (
    <div className="max-w-[680px] mx-auto rounded-md">
      <div className="mt-12 bg-white rounded-md p-4">
        <h1 className="mt-4 text-start font-bold text-2xl">Чөлөө авсан:</h1>
        <Calendar/>
      </div>
    </div>
  );
};
export default RequestPage;
