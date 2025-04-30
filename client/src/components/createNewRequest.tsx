"use client"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFormik } from "formik";
import Image from "next/image";
import { Send } from "lucide-react";
import { UploadFilesInCloudinary } from "@/lib/uploadfiles";
import { useState } from 'react';

export interface RequestFormValues {
  requestDate: string;
  startTime: string;
  endTime: string;
  email: string;
  workPlace: string;
  principalName: string;
  position: string;
  optionalFile: string;
  optionalFileMeduuleg: string;
  result: string;
  _id: string;
}

const RequestSuccessDiv = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#0000004D]">
      <div className="max-w-[608px] text-center w-full flex flex-col items-center gap-8 p-8 border-[1px] border-[#E4E4E7] rounded-[8px] bg-[#FFFFFF]">
        <Image src="/sent.png" alt="Success" width={80} height={80} />
        <div>
          <h1 className="text-2xl">Амжилттай илгээгдлээ</h1>
          <span className="text-sm text-[#71717A]">
            Таны хүсэлттэй ахлах ажилтан танилцсаны дараа хариуг танд Teams
            Chat-аар мэдэгдэх болно.
          </span>
        </div>
      </div>
    </div>
  );
};

export const CreateNewRequest = ({ email }: { email: string }) => {
  const { data } = useCreateRequestQuery({ variables: { email } });
  const { createRequest } = useCreatesRequestMutation();
  const [showSuccess, setShowSuccess] = useState(false);

  const formik = useFormik<RequestFormValues>({
    initialValues: {
      startTime: "",
      endTime: "",
      email,
      workPlace: "",
      principalName: "",
      position: "",
      optionalFile: "",
      optionalFileMeduuleg: "",
      result: "",
      _id: "",
      requestDate: ""
    },
    onSubmit: async (values) => {
      try {
        const optionalFileUrl = values.optionalFile
          ? await UploadFilesInCloudinary(values.optionalFile)
          : "";
        const { requestDate, startTime, endTime } = values;
        const variables = {
          requestDate,
          startTime,
          endTime,
          email,
          optionalFile: optionalFileUrl,
        };
        await createRequest({ variables });
        formik.resetForm();
        setShowSuccess(true); // Show success message
      } catch (error) {
        console.error("Submission error:", error);
      }
    },
  });

  return (
    <>
      {showSuccess && <RequestSuccessDiv />}
      <form onSubmit={formik.handleSubmit}>
        <div className="text-[#000000] text-sm max-w-[680px] mx-auto bg-white mt-12 h-full p-8 rounded-md">
          <div className="font-bold pt-4 text-2xl">Чөлөөний хүсэлт</div>
          <span className="text-[#EF4430]">
            Хамгийн богинодоо нэг өдрийн чөлөө авах боломжтой.
          </span>
          <div className="mt-4 flex">
            <div className="flex-1 pr-3">
              <Label className="py-2">Эхлэх өдөр</Label>
              <Input
                name="startTime"
                type="date"
                value={formik.values.startTime}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex-1">
              <Label>Дуусах өдөр</Label>
              <Input
                name="endTime"
                type="date"
                value={formik.values.endTime}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="flex">
            <div className="mt-6 flex-1 pr-3">
              <Label>Тэмцээний албан ёсны удирдамж</Label>
              <Input
                name="optionalFile"
                type="file"
                className="file-input max-w-xs"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mt-6 flex-1">
              <Label>Тэмцээний мэдүүлэг (заавал) хавсаргах</Label>
              <Input
                name="optionalFileMeduuleg"
                type="file"
                className="file-input w-full max-w-xs"
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="mt-6">
            <div className="flex">
              <div className="flex-1 mt-2 pr-3">
                <Label>Ажлын (Сургууль) газар</Label>
                <Input
                  name="workPlace"
                  value={formik.values.workPlace}
                  onChange={formik.handleChange}
                  placeholder="Жишээ нь: Биеийн тамир, спортын газар"
                />
              </div>
              <div className="flex-1 mt-2">
                <Label>Захирлын (дарга) нэр</Label>
                <Input
                  name="principalName"
                  value={formik.values.principalName}
                  onChange={formik.handleChange}
                  placeholder="Жишээ нь: О.Болдбаатар"
                />
              </div>
            </div>
            <div className="flex mt-6">
              <div className="flex-1 mt-2 pr-3">
                <Label>Албан тушаал (анги)</Label>
                <Input
                  name="position"
                  value={formik.values.position}
                  onChange={formik.handleChange}
                  placeholder="Жишээ нь: Мэргэжилтэн"
                />
              </div>
              <div className="flex-1 mt-2">
                <Label>Тамирчны нэр</Label>
                <Input
                  name="_id"
                  value={formik.values._id}
                  onChange={formik.handleChange}
                  placeholder="Жишээ нь: О.Бат"
                />
              </div>
   s         </div>
          </div>
          <Button className="w-full mt-6" type="submit">
            <Send size={14} />
            Хүсэлт илгээх
          </Button>
        </div>
      </form>
    </>
  );
};

// export default CreateNewRequest;
// function useCreateRequestQuery({}: { variables: { email: string; }; }): { data: unknown; } {
//   throw console.log(error)
// }

// function useCreatesRequestMutation(): { createRequest: unknown; } {
//   throw new Error("Function not implemented.");
// }

