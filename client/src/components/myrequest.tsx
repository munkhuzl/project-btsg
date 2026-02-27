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
import { useAuth } from "@/context/AuthProvider";

export function MyRequest() {
  const router = useRouter();
  const { isAuth } = useAuth();
  const { data } = useGetRequestByUserIdQuery();

  // ✅ find → filter (array болгоно)
  const acceptedReqs = data?.getRequestByUserID?.filter(
    (r) => r.result === "accepted",
  );

  return (
    <div className="max-w-[680px] mx-auto">
      <h1 className="text-start mt-4 font-bold mx-2">
        Таны өмнөх чөлөөний хуудаснууд:
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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {acceptedReqs?.map((req, index) => (
          <Dialog key={req._id}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="my-2 flex flex-col items-start justify-between gap-2"
              >
                <span>Чөлөөний хуудас</span>
                <span>
                  Илгээсэн огноо: {req.startTime} - {req.endTime}
                </span>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px] bg-white">
              <div
                id={`print-area-${req._id}`} // ✅ unique id
                className="bg-white p-10 text-[14px] text-black leading-relaxed ml-6"
              >
                <div className="text-center mb-4">
                  <img
                    src="/logo2.png"
                    alt="logo2"
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                  <h1 className=" mt-4">
                    БИЕИЙН ТАМИР, СПОРТЫН ГАЗАР ТЭМЦЭЭН, УРАЛДААНД ОРОЛЦОХ ТАМИРЧИН, (ДАСГАЛЖУУЛАГЧ)-ЫГ ЧӨЛӨӨЛҮҮЛЭХ ХУУДАС
                  </h1>
                  <div className="flex justify-between mt-4 text-[12px] px-2">
                    <p>
                      {new Date().getFullYear()}.
                      {String(new Date().getMonth() + 1).padStart(2, "0")}.
                      {String(new Date().getDate()).padStart(2, "0")}
                    </p>
                    <p>Дугаар 03/{String(index + 1).padStart(2, "60")}</p>
                    <p>Баян-Өндөр сум</p>
                  </div>
                </div>
                <h1 className="font-bold text-center" > "{`${req.workPlace?.company_name}-ЫН ДАРГА ${req.workPlace?.principal_name} ТАНАА`.toUpperCase()}"</h1>
                {/* <p className="font-medium mb-4 text-center">{}</p> */}

                <h3 className="text-center font-semibold mb-4 underline"></h3>

                <p className="text-justify indent-8">
                  Эрүүл мэндийн сайд, Сангийн сайдын хамтарсан 2009 оны 53/45
                  дугаар тушаалын нэгдүгээр хавсралтаар батлагдсан журмын 4.2, 4.3 дахь 
                  заалтыг тус тус үндэслэн {req.lastname} овогтой {req.firstname} -д{" "}
                  {req.startTime}-ны өдрөөс {req.endTime} хүртэлх хугацаанд
                  ажлаас нь чөлөөлж, хамтран ажиллахыг хүсье. </p>
                  <p className="indent-8 text-justify">
                 Мөн тус тушаалын 3.2 дахь заалтад, "Ажлаас чөлөөлөгдсөн хугацааны цалинг өмчийн хэлбэр харгалзахгүйгээр үндсэн байгууллагаас нь олгоно." гэж заасан тул тамирчин (дасгалжуулагч)-ны чөлөөтэй хугацааны цалинг шийдвэрлэж, хамтран ажиллахыг хүсье. 
                   </p>

                <div className="flex flex-wrap justify-center mt-4">
                  <h1 className="text-center relative ">БИЕИЙН ТАМИР, СПОРТЫН ГАЗРЫН ДАРГА</h1>
                  <div className="justify-center relative w-48 h-40">
                    <img
                      src="/tamga1.svg"
                      alt="tamga"
                      className="absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 opacity-80 rotate-[8deg]"
                    />
                    <img
                      src="/gar.svg"
                      className="absolute top-1/2 left-1/2 w-40 h-20 -translate-x-1/2 -translate-y-1/2 z-10"
                    />
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
      </div>

      {/* Create new request */}
      <div className="bg-white p-4 text-center mt-6">
        <h1 className="mt-2">Чөлөөний хүсэлт</h1>
        <p className="mt-2 text-red-400 italic">
          Чөлөөний хүсэлт илгээхдээ тэмцээний албан ёсны тамга тэмдэгтэй
          удирдамж, мэдүүлэгийг заавал хавсаргана.
        </p>
        <div className="flex justify-start p-4 mt-2">
          <Button
            onClick={() => {
              if (!isAuth) return router.push("/login");

              router.push("/createNewRequest");
            }}
          >
            <Send size={14} />
            Чөлөөний хүсэлт илгээх
          </Button>
        </div>
      </div>
    </div>
  );
}


