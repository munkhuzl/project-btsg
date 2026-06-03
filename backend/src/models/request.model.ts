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
    }
  },
  {
    timestamps: true,
  }
);

export const RequestModel = models.Request || model<Request>("Request", RequestSchema);
