"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const MyRequest = () => {
  const router= useRouter();
  return (
    <div className="max-w-[680px] mx-auto">
      <h1 className="text-start mt-4 ">06/13-06/15</h1>
      <div className="bg-white bg-white my-6 pb-4">
        <p className="text-wrap text-center text-gray-300 mb-4">
          Чөлөөний хуудас байхгүй байна. Таны чөлөөний хуудсууд энд харагдана.
        </p>
      </div>
      <div className="bg-white p-4 text-gray-300 text-center">
        <h1>Чөлөөний хүсэлт</h1>
        <p>
          Чөлөөний хүсэлт илгээхдээ тэмцээний албан ёсны тамга тэмдэгтэй
          удирдамж, мэдүүлэгийг заавал хавсаргана.
        </p>
        <div className=" flex justify-end p-4 text-gray-300">
          <Button className="" 
          onClick={()=>{router.push('/createNewRequest')}}>Чөлөөний хүсэлт илгээх</Button>
          <Send size={14} />
        </div>
      </div>
    </div>
  );
};
export default MyRequest;
