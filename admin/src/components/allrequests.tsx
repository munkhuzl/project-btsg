"use client";

import { Card } from "./ui/card";
import { Clock, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { useChangeReStatusMutation, useGetAllRequestsQuery } from "@/generated";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RequestsList = () => {
  const { isAuth } = useAuth();
  const { data, loading: queryLoading, error } = useGetAllRequestsQuery();
  const [changeReStatus, { loading: mutationLoading }] =
    useChangeReStatusMutation();

  useEffect(() => {
    if (!isAuth) toast.error("User must be logged in");
  }, [isAuth]);

  if (!isAuth) return null;
  if (queryLoading)
    return (
      <p className="text-center py-12 text-gray-500">Loading requests...</p>
    );
  if (error)
    return (
      <p className="text-center py-12 text-red-500">Failed to load requests.</p>
    );

  const requests = data?.getAllRequests || [];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getTypeLabel = (type?: string) => {
    switch (type) {
      case "longterm":
        return "Урт хугацааны";
      case "shortterm":
        return "Богино хугацаа";
      case "mediumterm":
        return "Дундаж хугацаа";
      default:
        return "Бусад";
    }
  };

  const calculateDays = (start: string | Date, end: string | Date) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleStatusChange = async (
    id: string,
    status: "pending" | "accepted" | "declined"
  ) => {
    try {
      await changeReStatus({
        variables: { id, result: status },
        refetchQueries: ["GetAllRequests"], // optional: update UI
      });
      toast.success("Статус амжилттай шинэчлэгдлээ");
    } catch (err) {
      console.error(err);
      toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  if (requests.length === 0) {
    return (
      <Card className="p-12 text-center container mx-auto">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <Calendar className="w-12 h-12 opacity-50" />
          <p>No time-off requests yet</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4 container mx-auto">
      {requests.map((request) => (
        <Card key={String(request._id)} className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              {request.result &&
                request.startTime &&
                request.endTime &&
                request.requestType &&
                request.optionalFileMeduuleg &&
                request.optionalFile &&
                request.workPlace && (
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">
                      {request.firstname}
                    </h3>

                    <span>
                        <a href={request.optionalFileMeduuleg} target="_blank" rel="noopener noreferrer" className="text-blie-600 underline">Файл харах </a>
                    </span>
                    <span>{getTypeLabel(request.requestType)}</span>
                    <span
                      className={`${getStatusColor(
                        request.result
                      )} px-3 py-1 rounded-md text-sm font-medium`}
                    >
                      {request.result
                        ? request.result.charAt(0).toUpperCase() +
                          request.result.slice(1)
                        : "Pending"}
                    </span>
                  </div>
                )}
              <p className="text-gray-600">{request.detailAboutRequest}</p>

              <div className="flex items-center gap-6 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {request.startTime} – {request.endTime}
                  </span>
                </div>
                {request.startTime && request.endTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {calculateDays(request.startTime, request.endTime)} days
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Select
              disabled={mutationLoading}
              value={request.result || "pending"}
              onValueChange={(value: "pending" | "accepted" | "declined") =>
                handleStatusChange(request._id, value)
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Change status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Хүлээгдэж буй</SelectItem>
                <SelectItem value="accepted">Зөвшөөрсөн</SelectItem>
                <SelectItem value="declined">Татгалзсан</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RequestsList;
