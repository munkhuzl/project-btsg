/* eslint-disable @next/next/no-img-element */
"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useGetRequestByUserIdQuery, RequestType } from "@/generated";
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
        {acceptedReqs?.map((req: RequestType, index: number) => (
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
                    БИЕИЙН ТАМИР, СПОРТЫН ГАЗАР ТЭМЦЭЭН, УРАЛДААНД ОРОЛЦОХ
                    ТАМИРЧИН, (ДАСГАЛЖУУЛАГЧ)-ЫГ ЧӨЛӨӨЛҮҮЛЭХ ХУУДАС
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
                <h1 className="font-bold text-center">
                  {" "}
                  &ldquo;
                  {`${req.workPlace?.company_name}-ЫН ДАРГА ${req.workPlace?.principal_name} ТАНАА`.toUpperCase()}
                  &ldquo;
                </h1>
                {/* <p className="font-medium mb-4 text-center">{}</p> */}

                <h3 className="text-center font-semibold mb-4 underline"></h3>

                <p className="text-justify indent-8">
                  Эрүүл мэндийн сайд, Сангийн сайдын хамтарсан 2009 оны 53/45
                  дугаар тушаалын нэгдүгээр хавсралтаар батлагдсан журмын 4.2,
                  4.3 дахь заалтыг тус тус үндэслэн {req.lastname} -ийн {" "}
                  {req.firstname} -д {req.startTime}-ны өдрөөс {req.endTime}{" "}
                  хүртэлх хугацаанд ажлаас нь чөлөөлж, хамтран ажиллана уу.{" "}
                </p>
                <p className="indent-8 text-justify">
                  Мөн тус тушаалын 3.2 дахь заалтад, &ldquo;Ажлаас чөлөөлөгдсөн
                  хугацааны цалинг өмчийн хэлбэр харгалзахгүйгээр үндсэн
                  байгууллагаас нь олгоно.&ldquo; гэж заасан тул тамирчин
                  (дасгалжуулагч)-ны чөлөөтэй хугацааны цалинг шийдвэрлэж,
                  хамтран ажиллахыг хүсье.
                </p>

                <div className="flex  mt-6 max-w-[680px] ">
                  <div className="flex-1 w-64">
                    <h1 className="text-start relative text-wrap flex-1 w-32 ">
                    БИЕИЙН ТАМИР, СПОРТЫН ГАЗРЫН ДАРГЫН
                    </h1>
                    <h1 className="text-start relative "> ҮҮРГИЙГ ТҮР ОРЛОН ГҮЙЦЭТГЭГЧ,
                      СПОРТЫН ХЭЛТСИЙН ДАРГА
                    </h1>
                    <div className="relative w-[300px] ml-16 mt-3">
                      <img
                        src="/tamga1.svg"
                        alt="tamga"
                        className="absolute ml-2 inset-0 w-80 h-80 m-auto rotate-8 scale-95  mix-blend-multiply contrast-125 saturate-150"
                      />

                      <img
                        src="/lkham.svg"
                        alt="signature"
                        className="absolute inset-0 w-40 h-20 m-auto z-10 opacity"
                      />

                    </div>
                  </div>
                  <div className="flex-row flex-1">
                    <h1>Э.ЛХАМСҮРЭНБААТАР</h1>
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
