"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useGetRequestByUserIdQuery } from "@/generated";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { printDocument } from "@/lib/print-document";
import Image from "next/image";
import {useAuth} from "@/context/AuthProvider";

export function MyRequest () {
  const router = useRouter();
  const { isAuth } = useAuth();
  const { data } = useGetRequestByUserIdQuery();

  // ✅ find → filter (array болгоно)
  const acceptedReqs = data?.getRequestByUserID?.filter(
    (r) => r.result === "accepted"
  );

  return (
    <div className="max-w-[680px] mx-auto">
      <h1 className="text-start mt-4 font-bold mx-2">
        Таны чөлөөний хуудаснууд:
      </h1>

      {/* Empty state */}
      {data?.getRequestByUserID?.length === 0 && (
        <div className="bg-white my-6 py-4">
          <p className="text-center text-gray-300">
            Чөлөөний хуудас байхгүй байна.
          </p>
        </div>
      )}

      {/* ✅ Accepted request-ууд */}
      {acceptedReqs?.map((req,index) => (
        <Dialog key={req._id}>
          <DialogTrigger asChild>
            <Button variant="outline" className="my-2 flex flex-col items-start justify-between gap-2">
              Чөлөөний хуудас
                Илгээсэн огноо: {req.startTime} - {req.endTime}
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[600px] bg-white">
            <div
              id={`print-area-${req._id}`} // ✅ unique id
              className="bg-white p-10 text-[14px] text-black leading-relaxed"
            >
              <div className="text-center mb-4">
                <Image
                  src="/logo2.png"
                  alt="logo2"
                  width={100}
                  height={100}
                  className="mx-auto"
                />
                <h1 className="font-bold mt-4">БИЕИЙН ТАМИР, СПОРТЫН ГАЗАР</h1>
                <div className="flex justify-between mt-4 text-[12px] px-2">
                <p>
                    {new Date().getFullYear()}.
                    {String(new Date().getMonth() + 1).padStart(2, '0')}.
                    {String(new Date().getDate()).padStart(2, '0')}
                  </p>
                <p>
                        Дугаар {String(index + 1).padStart(2, "0")}/14
                </p>
                  <p>Баян-Өндөр сум</p>
                </div>
              </div>

              {/* <p className="font-medium mb-4 text-center">{}</p> */}

              <h3 className="text-center font-semibold mb-4 underline">
                
              </h3>

              <p className="text-justify indent-8">
                     Эрүүл мэндийн сайд, Сангийн сайдын хамтарсан 2009 оны 53/45
                дугаар тушаалын нэгдүгээр хавсралтаар батлагдсан журмын 3.1
                дэх заалтыг үндэслэн{" "}
                {req.lastname} овогтой {req.firstname} -д{" "}
                {req.startTime}-ны өдрөөс {req.endTime} хүртэлх хугацаанд
                ажлаас нь чөлөөлж, хамтран ажиллахыг хүсье.
              </p>

              <div className="flex justify-center mt-12">
                <div className="text-center">
                      <Image src="/tamga.JPG"
                      alt="tamga"
                      width={100}
                      height={100} />

                </div>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Хаах</Button>
              </DialogClose>
              <Button
                type="button"
                onClick={() =>
                  printDocument(`print-area-${req._id}`, "chuluu_olgov.pdf")
                }
              >
                Татах
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}

      {/* Create new request */}
      <div className="bg-white p-4 text-gray-300 text-center mt-6">
        <h1>Чөлөөний хүсэлт</h1>
        <p className="text-red-400 italic">
          Чөлөөний хүсэлт илгээхдээ тэмцээний албан ёсны тамга тэмдэгтэй
          удирдамж, мэдүүлэгийг заавал хавсаргана.
        </p>
        <div className="flex justify-end p-4">
          <Button onClick={() => {
              if(!isAuth) return router.push("/login");

              router.push("/createNewRequest")
          }}>
            <Send size={14} />
            Чөлөөний хүсэлт илгээх
          </Button>
        </div>
      </div>
    </div>
  );
}
