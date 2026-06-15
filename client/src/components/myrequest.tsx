/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Send,
  FileText,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Printer,
  Download,
} from "lucide-react";
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
import { LeaveSlipPreview } from "./leave-slip-preview";

const getFieldValue = (
  fieldValues: Array<{ fieldId: string; value: string }> | null | undefined,
  fieldId: string,
) => {
  if (!fieldValues) return "";
  return fieldValues.find((fv) => fv.fieldId === fieldId)?.value || "";
};

// Parse the GraphQL Date scalar defensively (may be an ISO string or epoch-ms string)
const parseDate = (value: unknown): Date => {
  const d = new Date(value as string);
  if (!isNaN(d.getTime())) return d;
  const n = new Date(Number(value));
  return isNaN(n.getTime()) ? new Date(0) : n;
};

export function MyRequest() {
  const router = useRouter();
  const { isAuth } = useAuth();
  const { data, loading } = useGetRequestByUserIdQuery();

  if (!isAuth) return null;

  const requests = data?.getRequestByUserID || [];

  // Sort newest-first and group by the month the request was sent (createdAt).
  const sorted = [...requests].sort(
    (a, b) =>
      parseDate(b.createdAt).getTime() - parseDate(a.createdAt).getTime(),
  );

  type MonthGroup = {
    key: string;
    label: string;
    items: Array<(typeof sorted)[number]>;
  };
  const monthGroups: MonthGroup[] = [];
  const groupIndex = new Map<string, MonthGroup>();
  sorted.forEach((req) => {
    const d = parseDate(req.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    let group = groupIndex.get(key);
    if (!group) {
      group = {
        key,
        label: `${d.getFullYear()} оны ${d.getMonth() + 1}-р сар`,
        items: [],
      };
      groupIndex.set(key, group);
      monthGroups.push(group);
    }
    group.items.push(req);
  });

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "accepted":
        return (
          <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-100">
            <CheckCircle2 className="size-3.5" /> Зөвшөөрсөн
          </span>
        );
      case "declined":
        return (
          <span className="flex items-center gap-1 bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold border border-rose-100">
            <XCircle className="size-3.5" /> Татгалзсан
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold border border-amber-100">
            <AlertCircle className="size-3.5" /> Хүлээгдэж буй
          </span>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-950">Миний хүсэлтүүд</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Чөлөө хүссэн түүх болон шийдвэрлэлтийн хариу
          </p>
        </div>
        <Button
          onClick={() => router.push("/createNewRequest")}
          className="bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl flex items-center gap-2 text-sm font-medium py-2.5"
        >
          <Send size={13} />
          Хүсэлт илгээх
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-24 bg-zinc-50 animate-pulse border border-zinc-100 rounded-xl"
            />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-zinc-50/50 border border-dashed border-zinc-200 rounded-2xl p-12 text-center">
          <FileText className="size-10 text-zinc-350 mx-auto mb-3" />
          <p className="text-zinc-500 text-sm">
            Та чөлөөний хүсэлт илгээгээгүй байна.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {monthGroups.map((group) => (
            <div key={group.key} className="space-y-4">
              <div className="flex items-center gap-3 sticky top-0 bg-white/85 backdrop-blur py-2 z-10">
                <h2 className="text-sm font-semibold text-zinc-700">
                  {group.label}
                </h2>
                <span className="text-xs font-medium text-zinc-400">
                  {group.items.length} хүсэлт
                </span>
              </div>
              {group.items.map((req) => {
                const templateName =
                  req.requestTypeDetail?.name || "Чөлөөний хүсэлт";
                const detailText =
                  getFieldValue(req.fieldValues, "detailAboutRequest") ||
                  "Чөлөөний хуудас";

                return (
                  <div
                    key={req._id}
                    className="bg-white border border-zinc-150 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-zinc-900 text-base">
                          {templateName}
                        </span>
                        {getStatusBadge(req.result)}
                      </div>

                      {detailText && (
                        <p className="text-zinc-600 text-sm">{detailText}</p>
                      )}

                      <div className="flex items-center gap-2 text-zinc-400 text-xs">
                        <Calendar className="size-3.5" />
                        <span>
                          Хугацаа: {req.startTime} - {req.endTime}
                        </span>
                      </div>

                      {req.comment && (
                        <div className="mt-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-xs text-zinc-600">
                          <span className="font-semibold text-zinc-800">
                            Хариу тайлбар:
                          </span>{" "}
                          {req.comment}
                        </div>
                      )}

                      {req.attachments && req.attachments.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {req.attachments.map((url, i) => (
                            <a
                              key={url}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-lg border border-zinc-150 bg-zinc-50 px-2.5 py-1 text-[11px] text-zinc-600 hover:text-zinc-950 hover:border-zinc-300 transition-colors"
                            >
                              <FileText className="size-3" /> Хавсралт {i + 1}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {req.result === "accepted" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="rounded-xl border-zinc-200 text-zinc-800 text-xs py-2 flex items-center gap-1.5 self-start md:self-center"
                          >
                            <Printer className="size-3.5" /> Чөлөөний хуудас
                            хэвлэх
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-[650px] md:max-w-[850px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-4 md:p-6 animate-in fade-in zoom-in-95 duration-200">
                          <LeaveSlipPreview
                            req={req}
                            templateName={templateName}
                            detailText={detailText}
                            printId={`print-area-${req._id}`}
                          />

                          <DialogFooter className="mt-6 flex justify-end gap-3">
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                className="rounded-xl border-zinc-200"
                              >
                                Хаах
                              </Button>
                            </DialogClose>
                            <Button
                              className="bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl flex items-center gap-1.5"
                              type="button"
                              onClick={() =>
                                printDocument(
                                  `print-area-${req._id}`,
                                  `${req.firstname}_chuluu.pdf`,
                                )
                              }
                            >
                              <Download className="size-4" /> PDF Татах
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
