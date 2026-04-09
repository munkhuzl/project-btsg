/* eslint-disable @next/next/no-img-element */
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

  const acceptedReqs = data?.getRequestByUserID?.filter(
    (r) => r.result === "accepted"
  );

  return (
    <div className="max-w-[680px] mx-auto px-3 sm:px-4">
      <h1 className="text-start mt-4 font-bold mx-2">
        Таны өмнөх чөлөөний хуудаснууд:
      </h1>

      {data?.getRequestByUserID?.length === 0 && (
        <div className="bg-white my-6 py-4">
          <p className="text-center text-gray-300">
            Чөлөөний хуудас байхгүй байна.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
        {acceptedReqs?.map((req, index: number) => (
          <Dialog key={req._id}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="my-2 flex flex-col items-start justify-between gap-1 text-left w-full"
              >
                <span className="text-sm sm:text-base">Чөлөөний хуудас</span>
                <span className="text-xs sm:text-sm break-words">
                  Илгээсэн: {req.startTime} - {req.endTime}
                </span>
              </Button>
            </DialogTrigger>

            <DialogContent className="w-[95%] max-w-[600px] bg-white p-3 sm:p-6 max-h-[90vh] overflow-y-auto">
              <div
                id={`print-area-${req._id}`}
                className="bg-white p-4 sm:p-10 text-[12px] sm:text-[14px] text-black leading-relaxed"
              >
                <div className="text-center mb-4">
                  <img
                    src="/logo2.png"
                    alt="logo2"
                    className="mx-auto w-16 h-16 sm:w-24 sm:h-24"
                  />
                  <h1 className="mt-4 text-xs sm:text-sm">
                    БИЕИЙН ТАМИР, СПОРТЫН ГАЗАР ТЭМЦЭЭН, УРАЛДААНД ОРОЛЦОХ
                    ТАМИРЧИН, (ДАСГАЛЖУУЛАГЧ)-ЫГ ЧӨЛӨӨЛҮҮЛЭХ ХУУДАС
                  </h1>
                  <div className="flex flex-col sm:flex-row justify-between mt-4 text-[10px] sm:text-[12px] px-2 gap-1 sm:gap-0">
                    <p>
                      {new Date().getFullYear()}.
                      {String(new Date().getMonth() + 1).padStart(2, "0")}.
                      {String(new Date().getDate()).padStart(2, "0")}
                    </p>
                    <p>Дугаар 03/{String(index + 1).padStart(2, "136")}</p>
                    <p>Баян-Өндөр сум</p>
                  </div>
                </div>

                <h1 className="font-bold text-center text-xs sm:text-sm">
                  “
                  {`${req.workPlace?.company_name}-ЫН ДАРГА ${req.workPlace?.principal_name} ТАНАА`.toUpperCase()}
                  ”
                </h1>

                <p className="text-justify indent-8 mt-4">
                  Эрүүл мэндийн сайд, Сангийн сайдын хамтарсан 2009 оны 53/45
                  дугаар тушаалын нэгдүгээр хавсралтаар батлагдсан журмын 4.2,
                  4.3 дахь заалтыг тус тус үндэслэн {req.lastname} -ийн {" "}
                  {req.firstname} -д {req.startTime}-ны өдрөөс {req.endTime}{" "}
                  хүртэлх хугацаанд ажлаас нь чөлөөлж, хамтран ажиллана уу.
                </p>

                <p className="indent-8 text-justify mt-2">
                  Мөн тус тушаалын 3.2 дахь заалтад, “Ажлаас чөлөөлөгдсөн
                  хугацааны цалинг өмчийн хэлбэр харгалзахгүйгээр үндсэн
                  байгууллагаас нь олгоно.” гэж заасан тул тамирчин
                  (дасгалжуулагч)-ны чөлөөтэй хугацааны цалинг шийдвэрлэж,
                  хамтран ажиллахыг хүсье.
                </p>

                <div className="flex flex-col sm:flex-row mt-6 gap-4">
                  <div className="flex-1">
                    <h1 className="text-sm sm:text-base">
                      БИЕИЙН ТАМИР, СПОРТЫН ГАЗРЫН ДАРГЫН
                    </h1>
                    <h1 className="text-sm sm:text-base">
                      ҮҮРГИЙГ ТҮР ОРЛОН ГҮЙЦЭТГЭГЧ, СПОРТЫН ХЭЛТСИЙН ДАРГА
                    </h1>

                    <div className="relative w-[200px] sm:w-[300px] h-[120px] sm:h-[160px] mx-auto sm:ml-16 mt-3">
                      <img
                      alt='tamga'
                        src="/tamga1.svg"
                        className="absolute inset-0 w-full h-full object-contain opacity-80"
                      />
                      <img
                      alt="signature"
                        src="/lkham.svg"
                        className="absolute inset-0 w-24 sm:w-40 m-auto z-10"
                      />
                    </div>
                  </div>

                  <div className="flex items-end justify-start sm:justify-end">
                    <h1 className="text-sm sm:text-base">
                      Э.ЛХАМСҮРЭНБААТАР
                    </h1>
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
                    printDocument(
                      `print-area-${req._id}`,
                      "chuluu_olgov.pdf"
                    )
                  }
                >
                  Татах
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      <div className="bg-white p-4 text-center mt-6">
        <h1 className="mt-2">Чөлөөний хүсэлт</h1>
        <p className="mt-2 text-red-400 italic text-sm sm:text-base">
          Чөлөөний хүсэлт илгээхдээ тэмцээний албан ёсны тамга тэмдэгтэй
          удирдамж, мэдүүлэгийг заавал хавсаргана.
        </p>
        <div className="flex justify-start p-2 sm:p-4 mt-2">
          <Button
            className="w-full sm:w-auto"
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
