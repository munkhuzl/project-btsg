"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {useAuth} from "@/context/AuthProvider";
import {useGetRequestByUserIdQuery} from "@/generated";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {printDocument} from "@/lib/print-document";

const MyRequest = () => {
  const router= useRouter();
  const { user } = useAuth();
  const { data } = useGetRequestByUserIdQuery({
      skip: !user?._id,
      variables: {
          userId: user?._id,
      }
  });

  const acceptedReqs = data?.getRequestByUserID.find((r)=> r.result === 'accepted')
  console.log(data?.getRequestByUserID, acceptedReqs);

  return (
    <div className="max-w-[680px] mx-auto">
      <h1 className="text-start mt-4 ">06/13-06/15</h1>
        {data?.getRequestByUserID.length === 0 &&
            <div className="bg-white my-6 pb-4">
                <p className="text-wrap text-center text-gray-300 mb-4">
                    Чөлөөний хуудас байхгүй байна. Таны чөлөөний хуудсууд энд харагдана.
                </p>
            </div>
        }
        {acceptedReqs && ( <div>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button variant="outline">Чөлөөний хуудас</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <div id="print-area">
                            <DialogHeader>
                                <DialogTitle>Чөлөө олгох</DialogTitle>
                                <DialogDescription>
                                    Чөлөө хүссэн {acceptedReqs.lastname} овогтой {acceptedReqs.firstname} таны {acceptedReqs.startTime}-c {acceptedReqs.endTime} хоорондох чөлөөг олгов.
                                </DialogDescription>
                            </DialogHeader>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Хаах</Button>
                            </DialogClose>
                            <Button type="button" onClick={()=> printDocument()}>Татах</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </div>)}

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
