import { models, model, Schema } from "mongoose";

interface FieldValue {
  fieldId: string;
  value: string; // contains the text input value or Cloudinary URL for files
}

export type Request = {
  email: string;
  firstname: string;
  lastname: string;
  userId: string;
  requestTypeId: Schema.Types.ObjectId; // references RequestType
  startTime: string;
  endTime: string;
  fieldValues: FieldValue[];
  attachments?: string[]; // Cloudinary URLs of files attached to the request
  result: "pending" | "accepted" | "declined";
  comment?: string;

  // Stable, global, sequential number assigned once when the request is first
  // accepted (see change-request-status resolver). Absent for pending/declined
  // requests. Shown identically on the client myrequest page and the emailed PDF.
  requestNumber?: number;

  // Legacy fields from requests created before the requestTypeId/fieldValues
  // system. Declared (optional) so Mongoose hydrates them on read, letting the
  // resolvers normalize old requests into the new shape. Not set on new docs.
  requestType?: string;
  detailAboutRequest?: string;
  optionalFile?: string;
  optionalFileMeduuleg?: string;
};

const RequestSchema = new Schema<Request>(
  {
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    requestTypeId: {
      type: Schema.Types.ObjectId,
      ref: "RequestType",
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    fieldValues: [
      {
        fieldId: { type: String, required: true },
        value: { type: String, default: "" }
      }
    ],
    attachments: {
      type: [String],
      default: [],
    },
    result: {
      type: String,
      enum: ['pending', 'declined', 'accepted'],
      default: 'pending',
    },
    comment: {
      type: String,
      default: ""
    },
    // Sparse + unique: only numbered (accepted) docs are constrained; the many
    // pending/declined docs carry no requestNumber and never collide.
    requestNumber: {
      type: Number,
      index: { unique: true, sparse: true },
    },

    // Legacy fields (read-only for old requests; not set on new ones).
    requestType: { type: String },
    detailAboutRequest: { type: String },
    optionalFile: { type: String },
    optionalFileMeduuleg: { type: String },
  },
  {
    timestamps: true,
  }
);

export const RequestModel = models.Request || model<Request>("Request", RequestSchema);
