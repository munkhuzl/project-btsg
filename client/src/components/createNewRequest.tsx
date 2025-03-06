"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFormik } from "formik";
import { useCreateRequestQuery, useCreatesRequestMutation } from '@/generated';
import Image from "next/image";
import { Send } from "lucide-react";
export interface RequestFormValues{
  requestDate:string,
  startTime: string,
  endTime:string,
  email:string,
  workPlace:string,
  principalName:string,
  position:string,
  optionalFile:string,
  optionalFileMeduuleg:string,
  result:string,
  _id: string,

}

const RequestSuccessDiv = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#0000004D]">
      <div className="max-w-[608px] text-center w-full flex flex-col items-center gap-8 p-8 broder-[1px] border-[#E4E4E7] rounded-[8px] inset-x-auto bg-[#FFFFFF]">
        <Image src={"/sent.png"} alt="Success" width={80} height={80} />
        <div>
          <h1 className="text-2xl text-center">Амжилттай илгээгдлээ </h1>
          <span className=" text-sm text-[#71717A]">
            Таны хүсэлттэй ахлах ажилтан танилцсаны дараа хариуг танд Teams
            Chat-аар мэдэгдэх болно.
          </span>
        </div>
      </div>
    </div>
  );
};

const CreateNewRequest = ({email}: {email:string}) => {
const { data } =useCreateRequestQuery({variables:{email}});
const {createRequest} = useCreatesRequestMutation();
// const {setMessage} = useMessage();
const formik = useFormik<RequestFormValues>({
  initialValues: {
    requestDate:'',
    startTime:'',
    endTime:'',
    email: '',
    workPlace:'',
    principalName:'',
    position:'',
    optionalFile:'',
    optionalFileMeduuleg:'',
    result:'',
    _id: '',
    },
    onSubmit: async () => {
      try {
        const optionalFileUrl = formik.values.optionalFile ? await uploadFilesInCloudinary(formik.values.optionalFile) : '';

        const { requestDate, startTime, endTime,  } = formik.values;

        const variables = {

          requestDate,
          startTime,
          endTime,
          email,
          optionalFile: optionalFileUrl,
        };

        await createRequest({ variables });

        formik.resetForm();

        <RequestSuccessDiv />
      } catch (error) {
        console.error('Submission error:', error);
      }
    },
  }

);
  return (
    <div className="text-[#000000] text-sm max-w-[680px] mx-auto bg-white mt-12 h-full p-8 rounded-md">
      <div className="font-bold pt-4 text-2xl">Чөлөөний хүсэлт</div>
      <span className="text-[#EF4430]">
        Хамгийн богинодоо нэг өдрийн чөлөө авах боломжтой.
      </span>
      <form>
        <div className="mt-4 flex ">
          <div className="flex-1 pr-3">
            <Label className="py-2">Эхлэх өдөр</Label>
            <Input placeholder="calendar " />
          </div>
          <div className="flex-1">
            <Label>Дуусах өдөр</Label>
            <Input placeholder="calendar" />
          </div>
        </div>
        <div className="flex ">
          <div className="mt-6 flex-1 pr-3">
            <Label>Тэмцээний албан ёсны удирдамж</Label>
            <Input
              type="file"
              className="file-input max-w-xs"
              placeholder="Жишээ нь: Буудлага спортын насанд хүрэгчдийн УАШТ"
            />
          </div>
          <div className="mt-6 flex-1">
            <Label>Тэмцээний мэдүүлэг (заавал) хавсаргах </Label>
            <Input type="file" className="file-input w-full max-w-xs " />
          </div>
        </div>
      </form>
      <div className="mt-6">
        <div className="flex">
          <div className="flex-1 mt-2 pr-3">
            <Label>Ажлын (Сургууль) газар</Label>
            <Input
              className="mt-2 "
              placeholder="Жишээ нь: Биеийн тамир, спортын газар"
            ></Input>
          </div>
          <div className="flex-1 mt-2">
            <Label className="f">Захирлын (дарга) нэр</Label>
            <Input
              className="mt-2 "
              placeholder="Жишээ нь: О.Болдбаатар"
            ></Input>
          </div>
        </div>
        <div className="flex mt-6">
          <div className="flex-1 mt-2 pr-3">
            <Label>Албан тушаал (анги)</Label>
            <Input
              className="mt-2 hover:placeholder-shown:"
              placeholder="Жишээ нь: Мэргэжилтэн"
            ></Input>
          </div>
          <div className="flex-1 mt-2">
            <Label className="f">Тамирчны нэр</Label>
            <Input className="mt-2 " placeholder="Жишээ нь: О.Бат"></Input>
          </div>
        </div>
      </div>
      <Button className="w-full mt-6">
        <Send size={14} />
        Хүсэлт илгээх
      </Button>
    </div>
  );
};
export default CreateNewRequest;
