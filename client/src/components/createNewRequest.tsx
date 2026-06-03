"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { ChevronDown, Send, X, FileText, Upload, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useSentRequestMutation, useGetRequestTypeTemplatesQuery } from "@/generated";
import { User } from "@/context/AuthProvider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import { uploadFilesInCloudinary } from "@/lib/upload-files";
import { toast } from "react-toastify";

interface RequestFormValues {
    requestTypeId: string;
    startTime: string;
    endTime: string;
    firstname: string;
    lastname: string;
    fields: Record<string, string>;
    attachments: string[];
}

const RequestSuccessDiv = ({ setShowSuccess }: { setShowSuccess: React.Dispatch<React.SetStateAction<boolean>> }) => (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50 transition-all duration-300">
        <div className="max-w-[500px] w-full text-center flex flex-col relative items-center gap-6 p-8 border border-zinc-100 rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-zinc-100 transition-colors"
            >
                <X className="size-5 text-zinc-500" />
            </button>
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                <CheckCircle className="size-10" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-zinc-900">Амжилттай илгээгдлээ</h1>
                <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                    Таны чөлөөний хүсэлтийг хүлээн авлаа. Шийдвэрлэлтийн хариуг &ldquo;Миний хүсэлтүүд&rdquo; хэсгээс шалгана уу.
                </p>
            </div>
            <Button className="w-full bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl py-3" onClick={() => setShowSuccess(false)}>
                Хаах
            </Button>
        </div>
    </div>
);

export const CreateNewRequest = ({ user }: { user: User }) => {
    const { data: templateData, loading: templatesLoading } = useGetRequestTypeTemplatesQuery();
    const [sentRequestMutation, { loading: sendingRequest }] = useSentRequestMutation();
    const [showSuccess, setShowSuccess] = useState(false);
    const [uploadingFields, setUploadingFields] = useState<Record<string, boolean>>({});
    const [uploadingAttachments, setUploadingAttachments] = useState(false);

    const templates = templateData?.getRequestTypeTemplates || [];

    const formik = useFormik<RequestFormValues>({
        initialValues: {
            requestTypeId: "",
            startTime: "",
            endTime: "",
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            fields: {},
            attachments: [],
        },
        validate: (values) => {
            const errors: Record<string, string | Record<string, string>> = {};
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (!values.requestTypeId) {
                errors.requestTypeId = "Хүсэлтийн төрлөө сонгоно уу";
            }

            if (!values.startTime) {
                errors.startTime = "Эхлэх өдрийг оруулна уу";
            } else {
                const start = new Date(values.startTime);
                if (start < today) {
                    errors.startTime = "Эхлэх өдөр өнөөдрөөс өмнө байж болохгүй";
                }
            }

            if (!values.endTime) {
                errors.endTime = "Дуусах өдрийг оруулна уу";
            } else {
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

            // Dynamic fields validation
            const selectedTemplate = templates.find(t => t._id === values.requestTypeId);
            if (selectedTemplate) {
                const fieldsErrors: Record<string, string> = {};
                selectedTemplate.fields.forEach(field => {
                    const val = values.fields[field.id];
                    if (field.required && (!val || val.trim() === "")) {
                        fieldsErrors[field.id] = `${field.label} талбарыг бөглөнө үү`;
                    }
                });
                if (Object.keys(fieldsErrors).length > 0) {
                    errors.fields = fieldsErrors;
                }
            }

            return errors;
        },
        onSubmit: async (values, { resetForm }) => {
            // Ensure no files are still uploading
            const isUploading = Object.values(uploadingFields).some(v => v) || uploadingAttachments;
            if (isUploading) {
                toast.warning("Файл хуулж байна, түр хүлээнэ үү");
                return;
            }

            try {
                // Map fields dictionary to FieldValueInput[]
                const fieldValues = Object.entries(values.fields).map(([fieldId, value]) => ({
                    fieldId,
                    value,
                }));

                const { data } = await sentRequestMutation({
                    variables: {
                        input: {
                            email: user.email,
                            firstname: values.firstname,
                            lastname: values.lastname,
                            userId: user._id || "",
                            requestTypeId: values.requestTypeId,
                            startTime: values.startTime,
                            endTime: values.endTime,
                            fieldValues,
                            attachments: values.attachments,
                        },
                    },
                    refetchQueries: ["GetRequestByUserID"],
                    awaitRefetchQueries: true,
                });

                if (data?.sentRequest.success) {
                    resetForm();
                    setShowSuccess(true);
                } else {
                    toast.error(data?.sentRequest.message || "Хүсэлт илгээхэд алдаа гарлаа.");
                }
            } catch (error) {
                console.error("Submission error:", error);
                toast.error("Хүсэлт илгээхэд алдаа гарлаа. Дахин оролдоно уу.");
            }
        },
    });

    const handleFileChange = async (fieldId: string, file?: File) => {
        if (!file) return;

        setUploadingFields(prev => ({ ...prev, [fieldId]: true }));
        try {
            const url = await uploadFilesInCloudinary(file);
            if (url) {
                formik.setFieldValue(`fields.${fieldId}`, url);
                toast.success("Файл амжилттай хуулагдлаа");
            } else {
                toast.error("Файл хуулахад алдаа гарлаа");
            }
        } catch (err) {
            console.error(err);
            toast.error("Файл хуулахад алдаа гарлаа");
        } finally {
            setUploadingFields(prev => ({ ...prev, [fieldId]: false }));
        }
    };

    const handleAttachmentsChange = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setUploadingAttachments(true);
        try {
            const urls = await Promise.all(
                Array.from(files).map((file) => uploadFilesInCloudinary(file))
            );
            const uploaded = urls.filter((url): url is string => !!url);
            if (uploaded.length > 0) {
                formik.setFieldValue("attachments", [...formik.values.attachments, ...uploaded]);
                toast.success(`${uploaded.length} файл амжилттай хуулагдлаа`);
            }
            if (uploaded.length < files.length) {
                toast.error("Зарим файл хуулахад алдаа гарлаа");
            }
        } catch (err) {
            console.error(err);
            toast.error("Файл хуулахад алдаа гарлаа");
        } finally {
            setUploadingAttachments(false);
        }
    };

    const removeAttachment = (url: string) => {
        formik.setFieldValue(
            "attachments",
            formik.values.attachments.filter((a) => a !== url)
        );
    };

    const selectedTemplate = templates.find(t => t._id === formik.values.requestTypeId);

    return (
        <>
            {showSuccess && <RequestSuccessDiv setShowSuccess={setShowSuccess} />}
            <form onSubmit={formik.handleSubmit} className="px-4 py-8">
                <div className="max-w-2xl mx-auto bg-white border border-zinc-150 rounded-2xl p-6 md:p-8 shadow-sm">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-zinc-950 flex items-center gap-2">
                            <FileText className="size-6 text-zinc-950" /> Чөлөөний хүсэлт илгээх
                        </h2>
                        <p className="text-zinc-500 text-sm mt-1">
                            Чөлөө авах төрлөө сонгон холбогдох мэдээллүүдийг үнэн зөв бөглөнө үү.
                        </p>
                    </div>

                    {/* Name fields */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <Label className="text-zinc-700 font-medium">Овог</Label>
                            <Input 
                                className="mt-1.5 h-11 rounded-xl"
                                {...formik.getFieldProps("lastname")} 
                                placeholder="Овгоо оруулна уу" 
                                required 
                            />
                        </div>
                        <div>
                            <Label className="text-zinc-700 font-medium">Нэр</Label>
                            <Input 
                                className="mt-1.5 h-11 rounded-xl"
                                {...formik.getFieldProps("firstname")} 
                                placeholder="Нэрээ оруулна уу" 
                                required 
                            />
                        </div>
                    </div>

                    {/* Request Type Selector */}
                    <div className="mb-6">
                        <Label className="text-zinc-700 font-medium">Чөлөө авах шалтгаан / Төрөл</Label>
                        {templatesLoading ? (
                            <div className="h-11 rounded-xl bg-zinc-50 animate-pulse mt-1.5 border border-zinc-200 flex items-center px-3 text-sm text-zinc-400">
                                Төрлүүдийг уншиж байна...
                            </div>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="mt-1.5 w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 flex items-center justify-between text-sm hover:border-zinc-350 focus:outline-none transition-all text-zinc-800">
                                    {selectedTemplate ? selectedTemplate.name : "Чөлөөний төрлөөс сонгох"}
                                    <ChevronDown className="size-4 text-zinc-400" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white min-w-[280px] w-[var(--radix-dropdown-menu-trigger-width)] border border-zinc-150 rounded-xl shadow-xl py-1 mt-1 z-30 animate-in fade-in duration-100">
                                    {templates.map((template) => (
                                        <DropdownMenuItem
                                            key={template._id}
                                            onSelect={() => {
                                                formik.setFieldValue("requestTypeId", template._id);
                                                formik.setFieldValue("fields", {}); // Reset dynamic fields
                                            }}
                                            className="px-4 py-3 text-sm hover:bg-zinc-50 cursor-pointer text-zinc-800 transition-colors focus:bg-zinc-50 focus:outline-none"
                                        >
                                            {template.name}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                        {formik.touched.requestTypeId && formik.errors.requestTypeId && (
                            <p className="text-red-500 text-xs mt-1.5">{formik.errors.requestTypeId}</p>
                        )}
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                            <Label className="text-zinc-700 font-medium">Эхлэх өдөр</Label>
                            <Input 
                                type="date"
                                className="mt-1.5 h-11 rounded-xl"
                                min={new Date().toISOString().split('T')[0]} 
                                {...formik.getFieldProps("startTime")} 
                                required 
                            />
                            {formik.touched.startTime && formik.errors.startTime && (
                                <p className="text-red-500 text-xs mt-1.5">{formik.errors.startTime}</p>
                            )}
                        </div>
                        <div>
                            <Label className="text-zinc-700 font-medium">Дуусах өдөр</Label>
                            <Input 
                                type="date"
                                className="mt-1.5 h-11 rounded-xl"
                                min={formik.values.startTime || new Date().toISOString().split('T')[0]}
                                {...formik.getFieldProps("endTime")} 
                                required 
                            />
                            {formik.touched.endTime && formik.errors.endTime && (
                                <p className="text-red-500 text-xs mt-1.5">{formik.errors.endTime}</p>
                            )}
                        </div>
                    </div>

                    {/* Attachments — unlimited files */}
                    <div className="mb-8">
                        <Label className="text-zinc-700 font-medium">Файл хавсаргах (заавал биш)</Label>
                        <p className="text-xs text-zinc-400 mt-1">Хүссэн тооны файл хавсаргаж болно.</p>
                        <div className="mt-1.5">
                            <input
                                type="file"
                                id="attachments-input"
                                multiple
                                className="hidden"
                                onChange={(e) => {
                                    handleAttachmentsChange(e.target.files);
                                    e.target.value = "";
                                }}
                                disabled={uploadingAttachments}
                            />
                            <label
                                htmlFor="attachments-input"
                                className="flex items-center justify-center gap-2 h-11 border border-dashed border-zinc-300 hover:border-zinc-500 rounded-xl px-4 text-sm font-medium text-zinc-650 cursor-pointer bg-zinc-50/50 hover:bg-zinc-50 transition-all select-none"
                            >
                                {uploadingAttachments ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin text-zinc-500" />
                                        Хуулж байна...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="size-4 text-zinc-500" />
                                        Файл сонгох
                                    </>
                                )}
                            </label>
                        </div>
                        {formik.values.attachments.length > 0 && (
                            <ul className="mt-3 space-y-2">
                                {formik.values.attachments.map((url) => (
                                    <li
                                        key={url}
                                        className="flex items-center justify-between gap-3 rounded-xl border border-zinc-150 bg-white px-3 py-2"
                                    >
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-xs text-zinc-700 hover:text-zinc-950 truncate"
                                        >
                                            <FileText className="size-4 text-zinc-400 shrink-0" />
                                            <span className="truncate">{decodeURIComponent(url.split("/").pop() || "Файл")}</span>
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => removeAttachment(url)}
                                            className="p-1 rounded-full hover:bg-zinc-100 transition-colors shrink-0"
                                            aria-label="Файл устгах"
                                        >
                                            <X className="size-4 text-zinc-500" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Dynamic Fields */}
                    {selectedTemplate && selectedTemplate.fields.length > 0 && (
                        <div className="border-t border-zinc-100 pt-6 mb-8 space-y-6">
                            <h3 className="text-sm font-semibold text-zinc-950 uppercase tracking-wider mb-2">Хүсэлтийн нэмэлт мэдээлэл</h3>
                            {selectedTemplate.fields.map((field) => {
                                const fieldError = (formik.errors.fields as Record<string, string>)?.[field.id];
                                const hasError = !!fieldError && (formik.touched.fields as Record<string, boolean>)?.[field.id];

                                return (
                                    <div key={field.id} className="flex flex-col">
                                        <Label className="text-zinc-700 font-medium flex items-center gap-1">
                                            {field.label}
                                            {field.required && <span className="text-red-500">*</span>}
                                        </Label>

                                        {field.type === "textarea" ? (
                                            <textarea
                                                className="mt-1.5 w-full min-h-24 rounded-xl border border-zinc-200 px-3.5 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 transition-all placeholder:text-zinc-400"
                                                placeholder={`${field.label} оруулна уу`}
                                                value={formik.values.fields[field.id] || ""}
                                                onChange={(e) => formik.setFieldValue(`fields.${field.id}`, e.target.value)}
                                            />
                                        ) : field.type === "file" ? (
                                            <div className="mt-1.5 flex items-center gap-4">
                                                <div className="relative flex-1">
                                                    <input
                                                        type="file"
                                                        id={`file-${field.id}`}
                                                        className="hidden"
                                                        onChange={(e) => handleFileChange(field.id, e.target.files?.[0])}
                                                        disabled={uploadingFields[field.id]}
                                                    />
                                                    <label
                                                        htmlFor={`file-${field.id}`}
                                                        className="flex items-center justify-center gap-2 h-11 border border-dashed border-zinc-300 hover:border-zinc-500 rounded-xl px-4 text-sm font-medium text-zinc-650 cursor-pointer bg-zinc-50/50 hover:bg-zinc-50 transition-all select-none"
                                                    >
                                                        {uploadingFields[field.id] ? (
                                                            <>
                                                                <Loader2 className="size-4 animate-spin text-zinc-500" />
                                                                Хуулж байна...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Upload className="size-4 text-zinc-500" />
                                                                Файл сонгох
                                                            </>
                                                        )}
                                                    </label>
                                                </div>
                                                {formik.values.fields[field.id] && (
                                                    <a
                                                        href={formik.values.fields[field.id]}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-zinc-500 underline flex items-center gap-1 hover:text-zinc-950 truncate max-w-[200px]"
                                                    >
                                                        Файл үзэх
                                                    </a>
                                                )}
                                            </div>
                                        ) : (
                                            <Input
                                                type={field.type}
                                                className="mt-1.5 h-11 rounded-xl"
                                                placeholder={`${field.label} оруулна уу`}
                                                value={formik.values.fields[field.id] || ""}
                                                onChange={(e) => formik.setFieldValue(`fields.${field.id}`, e.target.value)}
                                            />
                                        )}

                                        {hasError && (
                                            <p className="text-red-500 text-xs mt-1">{fieldError}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button 
                        className="w-full bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl py-3 flex items-center justify-center gap-2 font-medium h-12 transition-all" 
                        type="submit" 
                        disabled={sendingRequest}
                    >
                        {sendingRequest ? (
                            <>
                                <Loader2 className="size-4 animate-spin" /> Илгээж байна...
                            </>
                        ) : (
                            <>
                                <Send size={15} /> Хүсэлт илгээх
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </>
    );
};