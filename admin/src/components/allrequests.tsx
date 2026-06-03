"use client";

import { useState } from "react";
import { Card } from "./ui/card";
import { Clock, Calendar, Check, X, MessageSquare, AlertCircle, FileText, Download, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { useChangeReStatusMutation, useGetAllRequestsQuery } from "@/generated";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// File type helper
const getFileType = (url?: string) => {
  if (!url) return null;
  const cleanUrl = url.toLowerCase().split('?')[0];
  if (cleanUrl.endsWith(".pdf")) return "pdf";
  if (cleanUrl.endsWith(".doc") || cleanUrl.endsWith(".docx")) return "doc";
  if (cleanUrl.endsWith(".jpg") || cleanUrl.endsWith(".jpeg") || cleanUrl.endsWith(".png") || cleanUrl.endsWith(".webp")) return "image";
  return "other";
};

const FilePreview = ({ url, label }: { url?: string; label: string }) => {
  const type = getFileType(url);

  if (!url) return <span className="text-zinc-400 italic text-xs">Хавсралт байхгүй</span>;

  return (
    <div className="mt-2 border border-zinc-150 rounded-xl p-3 bg-zinc-50 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <FileText className="size-4 text-zinc-500 shrink-0" />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-zinc-800 truncate max-w-[200px]">{label}</p>
          <p className="text-[10px] text-zinc-400 uppercase font-medium">{type} хавсралт</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-50 hover:text-zinc-950 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-sm"
        >
          <Download className="size-3" /> Үзэх
        </a>
      </div>
    </div>
  );
};

const RequestsList = () => {
  const { isAuth } = useAuth();
  const { data, loading: queryLoading, error, refetch } = useGetAllRequestsQuery();
  const [changeReStatus, { loading: mutationLoading }] = useChangeReStatusMutation();

  // Review comment states
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [reviewResult, setReviewResult] = useState<"accepted" | "declined">("accepted");
  const [reviewComment, setReviewComment] = useState("");

  if (!isAuth) return null;
  if (queryLoading) {
    return (
      <div className="space-y-4 max-w-4xl mx-auto px-6">
        {[1, 2].map((i) => (
          <div key={i} className="h-36 bg-zinc-50 animate-pulse border border-zinc-100 rounded-2xl" />
        ))}
      </div>
    );
  }
  if (error) return <p className="text-center py-12 text-rose-500 font-medium">Алдаа гарлаа: Хүсэлтүүдийг уншиж чадсангүй.</p>;

  const requests = data?.getAllRequests || [];

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "accepted":
        return "bg-emerald-50 text-emerald-700 border-emerald-150";
      case "declined":
        return "bg-rose-50 text-rose-700 border-rose-150";
      default:
        return "bg-amber-50 text-amber-700 border-amber-150";
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "accepted": return "Зөвшөөрсөн";
      case "declined": return "Татгалзсан";
      default: return "Хүлээгдэж буй";
    }
  };

  const calculateDays = (start: string, end: string) => {
    try {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    } catch {
      return 1;
    }
  };

  const handleOpenReview = (id: string, result: "accepted" | "declined") => {
    setSelectedRequestId(id);
    setReviewResult(result);
    setReviewComment("");
    setOpenReviewDialog(true);
  };

  const submitReview = async () => {
    if (!selectedRequestId) return;

    try {
      await changeReStatus({
        variables: {
          id: selectedRequestId,
          result: reviewResult,
          comment: reviewComment,
        },
      });
      toast.success(
        reviewResult === "accepted"
          ? "Хүсэлтийг амжилттай зөвшөөрлөө"
          : "Хүсэлтээс татгалзлаа"
      );
      setOpenReviewDialog(false);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  if (requests.length === 0) {
    return (
      <Card className="p-16 text-center max-w-2xl mx-auto border-dashed border-2 border-zinc-200 shadow-none">
        <div className="flex flex-col items-center gap-3 text-zinc-400">
          <Calendar className="w-12 h-12 opacity-40" />
          <p className="font-semibold text-sm">Ирсэн чөлөөний хүсэлт байхгүй байна</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-6">
      {[...requests].reverse().map((request) => {
        const templateName = request.requestTypeDetail?.name || "Чөлөөний хүсэлт";
        const isPending = request.result === "pending";
        const days = request.startTime && request.endTime ? calculateDays(request.startTime, request.endTime) : 1;

        return (
          <Card key={String(request._id)} className="p-6 border border-zinc-150 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden bg-white">
            {/* Status bar top */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <span className="font-bold text-zinc-900 text-base">
                  {request.lastname} {request.firstname}
                </span>
                <span className="text-xs text-zinc-400 font-medium">({request.email})</span>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusBadge(request.result)}`}>
                {getStatusLabel(request.result)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Request Details */}
              <div className="md:col-span-8 space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Чөлөөлөх хэлбэр</span>
                  <p className="font-bold text-zinc-800 text-sm mt-0.5">{templateName}</p>
                </div>

                {/* Render Dynamic Field Values */}
                {request.fieldValues && request.fieldValues.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50 border border-zinc-100 rounded-xl p-4">
                    {request.fieldValues.map((fv) => {
                      // Find field label from template details
                      const fieldDef = request.requestTypeDetail?.fields.find((f) => f.id === fv.fieldId);
                      const label = fieldDef?.label || fv.fieldId;
                      const isFile = fieldDef?.type === "file" || fv.value.startsWith("http");

                      if (isFile) {
                        return (
                          <div key={fv.fieldId} className="sm:col-span-2">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">{label}</span>
                            <FilePreview url={fv.value} label={label} />
                          </div>
                        );
                      }

                      return (
                        <div key={fv.fieldId} className={fieldDef?.type === "textarea" ? "sm:col-span-2" : ""}>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">{label}</span>
                          <p className="text-sm font-semibold text-zinc-800 mt-0.5 leading-relaxed">{fv.value || "Хоосон"}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Attachments uploaded by the user */}
                {request.attachments && request.attachments.length > 0 && (
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Нэмэлт хавсралтууд</span>
                    <div className="space-y-2">
                      {request.attachments.map((url, i) => (
                        <FilePreview
                          key={url}
                          url={url}
                          label={decodeURIComponent(url.split("/").pop() || `Хавсралт ${i + 1}`)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Time range */}
                <div className="flex items-center gap-6 text-zinc-500 text-xs">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                    <span>Хугацаа: {request.startTime} – {request.endTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-zinc-400" />
                    <span>Хоног: {days} хоног</span>
                  </div>
                </div>

                {/* Admin Feedback Comment */}
                {request.comment && (
                  <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-xl flex items-start gap-2 text-xs text-zinc-600">
                    <MessageSquare className="size-4 text-zinc-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-zinc-800">Хариу тайлбар:</span> {request.comment}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="md:col-span-4 flex flex-col justify-center gap-3">
                {isPending ? (
                  <>
                    <Button
                      onClick={() => handleOpenReview(request._id, "accepted")}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2.5 h-11 flex items-center justify-center gap-1.5 text-xs font-semibold shadow-sm w-full"
                    >
                      <Check className="size-4" /> Зөвшөөрөх
                    </Button>
                    <Button
                      onClick={() => handleOpenReview(request._id, "declined")}
                      className="bg-rose-600 hover:bg-rose-500 text-white rounded-xl py-2.5 h-11 flex items-center justify-center gap-1.5 text-xs font-semibold shadow-sm w-full"
                    >
                      <X className="size-4" /> Татгалзах
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleOpenReview(request._id, request.result === "accepted" ? "accepted" : "declined")}
                      className="border-zinc-200 text-zinc-500 hover:text-zinc-800 rounded-xl py-2 h-9 text-[11px] font-semibold"
                    >
                      Шийдвэрийг өөрчлөх
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}

      {/* Review Confirmation with Comment Dialog */}
      <Dialog open={openReviewDialog} onOpenChange={setOpenReviewDialog}>
        <DialogContent className="max-w-[480px] bg-white rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <AlertCircle className={`size-5 ${reviewResult === "accepted" ? "text-emerald-500" : "text-rose-500"}`} />
              Хүсэлтийг шийдвэрлэх
            </DialogTitle>
          </DialogHeader>

          <div className="my-4 space-y-3">
            <p className="text-xs text-zinc-500 leading-relaxed">
              Та энэхүү хүсэлтийг <strong>{reviewResult === "accepted" ? "зөвшөөрөх" : "татгалзах"}</strong> гэж байна. Хэрэглэгчид харагдах тайлбар/хариу зурвасыг доор оруулж болно.
            </p>
            <textarea
              className="w-full min-h-24 rounded-xl border border-zinc-250 px-3.5 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 transition-all placeholder:text-zinc-400"
              placeholder="Жишээ нь: Чөлөөг олгож Биеийн тамир, спортын даргын тамга тэмдэгтэй хуудсыг хавсаргав."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
            />
          </div>

          <DialogFooter className="flex justify-end gap-3 border-t border-zinc-100 pt-4">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-xl border-zinc-200 h-10 text-xs">Цуцлах</Button>
            </DialogClose>
            <Button
              onClick={submitReview}
              disabled={mutationLoading}
              className={`rounded-xl h-10 text-xs text-white font-semibold flex items-center justify-center gap-1.5 ${
                reviewResult === "accepted" ? "bg-emerald-600 hover:bg-emerald-500" : "bg-rose-600 hover:bg-rose-500"
              }`}
            >
              {mutationLoading ? <Loader2 className="size-3.5 animate-spin" /> : "Батлах"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RequestsList;