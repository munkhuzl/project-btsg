"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
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

const MyRequest = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { data } = useGetRequestByUserIdQuery({
    skip: !user?._id,
    variables: {
      userId: user?._id,
    },
  });

  const acceptedReqs = data?.getRequestByUserID.find(
    (r) => r.result === "accepted"
  );
  console.log(data?.getRequestByUserID, acceptedReqs);

  return (
    <div className="max-w-[680px] mx-auto">
      <h1 className="text-start mt-4 font-bold mx-2">Таны чөлөөний хуудаснууд: </h1>
      {data?.getRequestByUserID.length === 0 && (
        <div className="bg-white my-6 pb-4">
          <p className="text-wrap text-center text-gray-300 mb-4">
            Чөлөөний хуудас байхгүй байна. Таны чөлөөний хуудсууд энд харагдана.
          </p>
        </div>
      )}
      {acceptedReqs && (
        <div>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button variant="outline" className="my-2">Чөлөөний хуудас</Button>
              </DialogTrigger>
              {/* <DialogContent className="sm:max-w-[425px]">
                        <div id="print-area">
                            <DialogHeader>
                                <DialogTitle>Чөлөө олгох</DialogTitle>
                                <DialogDescription>
                                    Чөлөө хүссэн {acceptedReqs.lastname} овогтой {acceptedReqs.firstname} таны {acceptedReqs.startTime}-c {acceptedReqs.endTime} хоорондох чөлөөг олгов.
                               <div className="flex">
                                    <div>
                                         <Image src={"/suld.png"} alt="logo" width={150} height={150} className="mx-auto" />
                                    </div>
                                    <div></div>
                               </div>
                               <div>do</div>
                                </DialogDescription>
                            </DialogHeader>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Хаах</Button>
                            </DialogClose>
                            <Button type="button" onClick={()=> printDocument()}>Татах</Button>
                        </DialogFooter>
                    </DialogContent> */}
              <DialogContent className="sm:max-w-[600px] bg-white">
                <div
                  id="print-area"
                  className="bg-white p-10 text-[14px] text-black leading-relaxed"
                >
                  <div className="text-center mb-4">
                    <Image
                      src="/suld.png"
                      alt="logo"
                      width={300}
                      height={300}
                      className="mx-auto"
                    />
                    <div className="flex justify-between mt-2 text-[12px] px-2">
                      <p>2025.10.19</p>
                      <p>№ 03/66</p>
                    </div>
                  </div>
                  <p className=" font-medium mb-4 text-center">БАЙГУУЛЛАГУУДАД</p>

                  <h3 className="text-center font-semibold mb-4 underline">
                    ЧӨЛӨӨ ОЛГОХ ТУХАЙ
                  </h3>

    
                  <p className="text-justify indent-8"> Эрүүл мэндийн сайд, Сангийн сайдын хамтарсан 2009 оны 53/45 дугаар тушаалын нэгдүгээр хавсралтаар батлагдсан журмын 3.1 дэх заалтыг үндэслэн 
                   {" "}  {acceptedReqs.lastname} овогтой {acceptedReqs.firstname}{" "}
                    -д {acceptedReqs.startTime}-ны өдрөөс  {acceptedReqs.endTime}{" "}
                    хүртэлх хугацаанд ажлаас нь чөлөөлж, хамтран ажиллахыг
                    хүсье.
                  </p>

                  <p className="mt-4">Хавсралт 1 хуудастай.</p>


                  <div className="flex justify-end mt-12">
                    <div className="text-center">
                      <p>_____________________</p>
                      <p>Даргын гарын үсэг</p>
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
                      printDocument("print-area", "chuluu_olgov.pdf")
                    }
                  >
                    Татах
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      )}

      <div className="bg-white p-4 text-gray-300 text-center">
        <h1>Чөлөөний хүсэлт</h1>
        <p>
          Чөлөөний хүсэлт илгээхдээ тэмцээний албан ёсны тамга тэмдэгтэй
          удирдамж, мэдүүлэгийг заавал хавсаргана.
        </p>
        <div className=" flex justify-end p-4 text-gray-300">
          <Button
            className=""
            onClick={() => {
              router.push("/createNewRequest");
            }}
          >
            <Send size={14}/>
            Чөлөөний хүсэлт илгээх
          </Button>
        </div>
      </div>
    </div>
  );
};
export default MyRequest;
