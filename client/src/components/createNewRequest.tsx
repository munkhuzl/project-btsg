"use client"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFormik } from "formik";
import Image from "next/image";
import { Send } from "lucide-react";
import { UploadFilesInCloudinary } from "@/lib/uploadfiles";
import { useState } from 'react';
import {useSentRequestMutation} from "@/generated";
import {User} from "@/context/AuthProvider";

export interface RequestFormValues {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  workPlace: {
    city: string;
    state: string;
    company_name: string;
    principal_name: string;
  }
  requestDate: string;
  school: {
    city: string;
    state: string;
    school_number: string;
    class: string;
  }
  position: string;
  requestType: string;
  startTime: string;
  endTime: string;
  optionalFile: string;
  optionalFileMeduuleg: string;
  optionalFilePublicId: string;
  detailAboutRequest: string;
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

export const CreateNewRequest = ({ user }: { user: User}) => {
  const [ sentRequestMutation ] = useSentRequestMutation();
  const [showSuccess, setShowSuccess] = useState(false);

  const formik = useFormik<RequestFormValues>({
    initialValues: {
      startTime: "",
      endTime: "",
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      email: user.email,
      workPlace: {
        city: user.workPlace?.city || '',
        state: user.workPlace?.state || '',
        company_name: user.workPlace?.company_name || '',
        principal_name: user.workPlace?.principal_name || '',
      },
      school: {
        city: user.school?.city || '',
        state: user.school?.state || '',
        school_number: user.school?.school_number || '',
        class: user.school?.class || ''
      },
      position: user.position || "",
      optionalFile: "",
      optionalFileMeduuleg: "",
      optionalFilePublicId: '',
      _id: user._id,
      requestDate: "",
      requestType: '',
      detailAboutRequest: '',
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
          email: user.email,
          optionalFile: optionalFileUrl,
        };
        console.log(variables, values);
        await sentRequestMutation({ variables: {
          input: {
            email: user.email,
            firstname: values.firstname,
            lastname: values.lastname,
            workPlace: {
              city: values.workPlace.city,
              state: values.workPlace.state,
              company_name: values.workPlace.company_name,
              principal_name: values.workPlace.principal_name
            },
            requestDate: requestDate,
            school: {
              city: values.school.city,
              state: values.school.state,
              school_number: values.school.school_number,
              class: values.school.class
            },
            requestType: 'mediumterm',
            startTime: variables.startTime,
            endTime: variables.endTime,
            optionalFile: variables.optionalFile,
            optionalFileMeduuleg: values.optionalFileMeduuleg,
            detailAboutRequest: values.detailAboutRequest,
          }
          }});
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
                {/*<Input*/}
                {/*  name="workPlace"*/}
                {/*  value={formik.values.workPlace}*/}
                {/*  onChange={formik.handleChange}*/}
                {/*  placeholder="Жишээ нь: Биеийн тамир, спортын газар"*/}
                {/*/>*/}
              </div>
              <div className="flex-1 mt-2">
                <Label>Захирлын (дарга) нэр</Label>
                <Input
                  name="workPlace.principal_name"
                  value={formik.values.workPlace.principal_name}
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
                  name="firstname"
                  value={user.firstname || formik.values.firstname}
                  onChange={formik.handleChange}
                  placeholder="Жишээ нь: О.Бат"
                />
              </div>
              <div className="flex-1 mt-2">
                <Label>Тамирчны овог</Label>
                <Input
                    name="lastname"
                    value={user.lastname || formik.values.lastname}
                    onChange={formik.handleChange}
                    placeholder={user.firstname}
                />
              </div>
            </div>
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

