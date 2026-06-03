import { Schema, model, models } from "mongoose";

export interface FieldDefinition {
  id: string;
  label: string;
  type: "text" | "number" | "date" | "file" | "textarea";
  required: boolean;
}

export interface RequestType {
  name: string;
  description?: string;
  fields: FieldDefinition[];
}

const RequestTypeSchema = new Schema<RequestType>({
  name: { type: String, required: true },
  description: String,
  fields: [{
    id: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, enum: ["text", "number", "date", "file", "textarea"], required: true },
    required: { type: Boolean, default: false }
  }]
}, { timestamps: true });

export const RequestTypeModel = models.RequestType || model<RequestType>("RequestType", RequestTypeSchema);
