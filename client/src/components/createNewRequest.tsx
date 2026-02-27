"use client";
import { useState } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import {ChevronDown, Send, X} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useSentRequestMutation } from "@/generated";
import { User } from "@/context/AuthProvider";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import {uploadFilesInCloudinary} from "@/lib/upload-files"; // keep it in a separate util file

interface RequestFormValues {
    email: string;
    firstname: string;
    lastname: string;
    userId: string;
    workPlace: {
        city: string;
        state: string;
        company_name: string;
        principal_name: string;
    };
    school: {
        city: string;
        state: string;
        school_number: string;
        class: string;
    };
    position: string;
    requestType: string;
    requestDate: string;
    startTime: string;
    endTime: string;
    optionalFile?: File | null;
    optionalFileMeduuleg?: File | null;
    detailAboutRequest: string;
}

const RequestSuccessDiv = ({setShowSuccess}: {setShowSuccess: React.Dispatch<React.SetStateAction<boolean>>})=>  (
    <div className="fixed inset-0 flex justify-center items-center bg-[#0000004D]">
        <div
            className="md:max-w-[608px] w-full text-center flex flex-col relative items-center gap-8 p-8 border border-[#E4E4E7] rounded-[8px] bg-white">
            <X className="size-5 text-black absolute top-2 right-4" onClick={()=>setShowSuccess(false)}/>
            <Image src="/checked.png" alt="Success" width={80} height={80}/>
            <div>
                <h1 className="text-2xl">Амжилттай илгээгдлээ</h1>
                <p className="text-sm text-[#71717A]">
                    Таны хүсэлттэй ахлах ажилтан танилцсаны дараа хариуг и-мэйлээр илгээх болно.
                </p>
            </div>
        </div>
    </div>
);


export const CreateNewRequest = ({ user }: { user: User }) => {
    const [sentRequestMutation, {loading}] = useSentRequestMutation();
    const [showSuccess, setShowSuccess] = useState(false);

    const formik = useFormik<RequestFormValues>({
        initialValues: {
            email: user.email,
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            userId: user._id || "",
            workPlace: {
                city: user.workPlace?.city || "",
                state: user.workPlace?.state || "",
                company_name: user.workPlace?.company_name || "",
                principal_name: user.workPlace?.principal_name || "",
            },
            school: {
                city: user.school?.city || "",
                state: user.school?.state || "",
                school_number: user.school?.school_number || "",
                class: user.school?.class || "",
            },
            position: user.position || "",
            requestType: "",
            requestDate: "",
            startTime: "",
            endTime: "",
            optionalFile: null,
            optionalFileMeduuleg: null,
            detailAboutRequest: "",
        },

        validate: (values) => {
            const errors: Partial<Record<keyof RequestFormValues, string>> = {};

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (values.startTime) {
                const start = new Date(values.startTime);
                if (start < today) {
                    errors.startTime = "Эхлэх өдөр өнөөдрөөс өмнө байж болохгүй";
                }
            }

            if (values.endTime) {
                const end = new Date(values.endTime);
                if (end < today) {
                    errors.endTime = "Дуусах өдөр өнөөдрөөс өмнө байж болохгүй";
                }
            }

            if (values.startTime && values.endTime) {
                const start = new Date(values.startTime);
                const end = new Date(values.endTime);

                if (end < start) {
                    errors.endTime = "Дуусах өдөр эхлэх өдрөөс өмнө байж болохгүй";
                }
            }

            return errors;
        },

        onSubmit: async (values, { resetForm }) => {
            try {
                let optionalFileUrl = "";
                let optionalFileMeduulegUrl = "";

                // Upload files if present
                if (values.optionalFile) {
                    optionalFileUrl = await uploadFilesInCloudinary(values.optionalFile);
                }
                if (values.optionalFileMeduuleg) {
                    optionalFileMeduulegUrl = await uploadFilesInCloudinary(values.optionalFileMeduuleg);
                }

                await sentRequestMutation({
                    variables: {
                        input: {
                            email: user.email,
                            firstname: values.firstname,
                            lastname: values.lastname,
                            workPlace: values.workPlace,
                            userId: user._id,
                            school: values.school,
                            position: values.position,
                            requestType: values.requestType,
                            requestDate: values.requestDate,
                            startTime: values.startTime,
                            endTime: values.endTime,
                            optionalFile: optionalFileUrl,
                            optionalFileMeduuleg: optionalFileMeduulegUrl,
                            detailAboutRequest: values.detailAboutRequest,
                        },
                    },
                });

                resetForm();
                setShowSuccess(true);
            } catch (error) {
                console.error("Submission error:", error);
            }
        },
    });

    const selectedType= formik.values.requestType;

    return (
        <>
            {showSuccess && <RequestSuccessDiv setShowSuccess={setShowSuccess}/>}
            <form onSubmit={formik.handleSubmit}>
                <div className="text-[#000000] text-sm max-w-[680px] mx-auto bg-white mt-12 p-8 rounded-md">
                    <h2 className="font-bold text-2xl">Чөлөөний хүсэлт</h2>
                    <span className="text-[#EF4430]">
            Хамгийн богинодоо нэг өдрийн чөлөө авах боломжтой.
          </span>

                    {/* Dates */}
                    <div className="mt-4 flex gap-3">
                        <div className="flex-1">
                            <Label>Эхлэх өдөр</Label>
                            <Input min={new Date().toISOString().split('T')[0]} type="date" {...formik.getFieldProps("startTime")} required={true}/>
                            {formik.touched.startTime && formik.errors.startTime && (
                                <p className="text-red-500 text-sm">{formik.errors.startTime}</p>
                            )}
                        </div>
                        <div className="flex-1">
                            <Label>Дуусах өдөр</Label>
                            <Input type="date" {...formik.getFieldProps("endTime")} required={true}/>
                        </div>
                    </div>

                    <div className="mt-6 flex-1">
                        <div className="mt-6 flex-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="bg-white border border-gray-200 rounded-md px-3 py-2 flex items-center gap-2 justify-between w-2/3">
                                    {selectedType ? selectedType : "Чөлөө авах хугацааны төрөл"}
                                    <ChevronDown className="size-5 text-gray-400" />
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="bg-white w-full px-6 py-2 border border-gray-200 rounded-md shadow-md space-y-2">
                                    <DropdownMenuItem
                                        onSelect={() => formik.setFieldValue("requestType", "longterm")}
                                        className="cursor-pointer"
                                    >
                                        Урт хугацаа
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {/* <DropdownMenuItem
                                        onSelect={() => formik.setFieldValue("requestType", "mediumterm")}
                                        className="cursor-pointer"
                                    >
                                        Дундаж хугацаа
                                    </DropdownMenuItem> */}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onSelect={() => formik.setFieldValue("requestType", "shortterm")}
                                        className="cursor-pointer"
                                    >
                                        Богино хугацаа
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                    </div>


                    {/* Files */}
                    <div className="mt-6 flex gap-3">
                        <div className="flex-1">
                            <Label>Тэмцээний албан ёсны удирдамж</Label>
                            <Input
                                type="file"
                                name="optionalFile"
                                onChange={(e) =>
                                    formik.setFieldValue("optionalFile", e.currentTarget.files?.[0] || null)
                                }
                            />
                        </div>
                        <div className="flex-1">
                            <Label>Тэмцээний мэдүүлэг (заавал)</Label>
                            <Input
                                type="file"
                                name="optionalFileMeduuleg"
                                onChange={(e) =>
                                    formik.setFieldValue("optionalFileMeduuleg", e.currentTarget.files?.[0] || null)
                                }
                                required={true}
                            />
                        </div>
                    </div>

                    {/* Workplace */}
                    <div className="mt-6 flex gap-3">
                        <div className="flex-1 ">
                            <Label>Ажлын газар/Сургууль</Label>
                            <div className="grid grid-cols-2 gap-3 mt-1">
                                <Input
                                    placeholder="Жишээ нь: Биеийн тамир, спортын газар"
                                    {...formik.getFieldProps("workPlace.company_name")}
                                />
                                {/* <Input
                                    placeholder="Жишээ нь: Хот, аймаг"
                                    {...formik.getFieldProps("workPlace.city")}
                                />
                                <Input
                                    placeholder="Жишээ нь: Дүүрэг, хороо"
                                    {...formik.getFieldProps("workPlace.state")}
                                /> */}
                                <Input
                                    placeholder="Захирал: Б.Бат"
                                    {...formik.getFieldProps("workPlace.principal_name")}
                                />
                            </div>

                        </div>
                    </div>

                    {/* Name and position */}
                    <div className="mt-6 flex gap-3">
                        <div className="flex-1">
                            <Label>Албан тушаал/Анги бүлэг</Label>
                            <Input
                                placeholder="Жишээ нь: Мэргэжилтэн, 12а ангийн сурагчч"
                                {...formik.getFieldProps("position")}
                            />
                        </div>

                    </div>
                    <div className="mt-6 flex gap-3">
                        <div className="flex-1">
                            <Label>Овог</Label>
                            <Input {...formik.getFieldProps("lastname")} placeholder="Жишээ нь: Бат" required={true}/>
                        </div>
                        <div className="flex-1">
                            <Label>Нэр</Label>
                            <Input {...formik.getFieldProps("firstname")} required={true} placeholder="Жишээ нь: Болд"/>
                        </div>
                    </div>
                    <div className="mt-6 w-full flex-1">
                        <Label>Тэмцээний албан ёсны нэрийг оруулна уу.</Label>
                        <Input {...formik.getFieldProps("detailAboutRequest")} required={true} className="h-20" placeholder="Жишээ нь: Өсвөр үеийн Буудлага спортын улсын аварга шалгаруулах тэмцээн"/>
                    </div>

                    <Button className="w-full mt-6" type="submit">
                        {loading ? <p>Уншиж байна...</p> : <><Send size={14} /> Хүсэлт илгээх</>}
                    </Button>
                </div>
            </form>
        </>
    );
};