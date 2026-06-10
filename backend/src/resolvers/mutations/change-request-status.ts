import { MutationResolvers } from "@/generated/graphql";
import { RequestModel, RequestTypeModel } from "@/models";
import { generateLeaveSlipPdf } from "@/utils/generate-leave-slip-pdf";
import { sendMail } from "@/utils/send-mail";

// Builds the leave-slip PDF and emails it to the requester. Best-effort: any
// failure here is logged and swallowed so it never fails the status mutation.
const sendAcceptanceEmail = async (request: InstanceType<typeof RequestModel>) => {
    try {
        const LEGACY_TYPE_LABELS: Record<string, string> = {
            shortterm: "Богино хугацааны чөлөө",
            longterm: "Урт хугацааны чөлөө",
        };

        const template = await RequestTypeModel.findById(request.requestTypeId);
        const templateName =
            template?.name || LEGACY_TYPE_LABELS[request.requestType ?? ""] || request.requestType || "Чөлөөний хүсэлт";

        const fieldDefs: Array<{ id: string; label: string }> = template?.fields || [];
        const detailText =
            request.fieldValues?.find((fv: { fieldId: string; value: string }) => fv.fieldId === "detailAboutRequest")
                ?.value || request.detailAboutRequest || "Чөлөөний хуудас";

        // Same data the client shows, excluding file URLs from the printed fields.
        const fields = (request.fieldValues || [])
            .filter((fv: { fieldId: string; value: string }) => fv.value && !fv.value.startsWith("http"))
            .map((fv: { fieldId: string; value: string }) => ({
                label: fieldDefs.find((f) => f.id === fv.fieldId)?.label || fv.fieldId,
                value: fv.value,
            }));

        const number = String((parseInt(String(request._id).slice(-4), 16) % 999) + 1).padStart(3, "0");
        const dateStr = new Date().toISOString().split("T")[0];

        const pdf = await generateLeaveSlipPdf({
            firstname: request.firstname,
            lastname: request.lastname,
            startTime: request.startTime,
            endTime: request.endTime,
            templateName,
            detailText,
            number,
            dateStr,
            fields,
        });

        await sendMail({
            to: request.email,
            subject: "Таны чөлөөний хүсэлт зөвшөөрөгдлөө",
            html: `
                <p>Сайн байна уу, ${request.lastname} ${request.firstname}.</p>
                <p>Таны <strong>${request.startTime}</strong>-аас <strong>${request.endTime}</strong> хүртэлх
                "<strong>${templateName}</strong>" чөлөөний хүсэлт зөвшөөрөгдлөө.</p>
                <p>Зөвшөөрсөн чөлөөний хуудсыг хавсаргав.</p>
            `,
            attachments: [
                {
                    filename: `${request.firstname}_chuluu.pdf`,
                    content: pdf,
                    contentType: "application/pdf",
                },
            ],
        });
    } catch (error) {
        console.error("Failed to send acceptance email:", error);
    }
};

export const changeReStatus: MutationResolvers['changeReStatus'] = async (_, { result, _id, comment }, { userId }) => {
    if (!userId) {
        return {
            message: 'User must be logged in',
        }
    }

    try {
        const existing = await RequestModel.findById(_id);
        const wasAccepted = existing?.result === "accepted";

        const updatedRequest = await RequestModel.findOneAndUpdate(
            { _id: _id },
            { result: result, comment: comment || "" },
            { new: true }
        );

        if (!updatedRequest) {
            return {
                message: 'No request found to update'
            }
        }

        // Only email on the transition INTO accepted (avoid re-sending on re-confirm).
        if (result === "accepted" && !wasAccepted) {
            await sendAcceptanceEmail(updatedRequest);
        }

        return {
            message: `Request status changed to ${result}`
        }
    } catch (error) {
        console.error('Error updating request status:', error);
        return {
            message: 'Failed to update request status'
        }
    }
}
