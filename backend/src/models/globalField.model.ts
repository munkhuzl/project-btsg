import { Schema, model, models } from "mongoose";
import { FieldDefinition } from "./requestType.model";

// A GlobalField is an independent form field that is NOT bound to any request
// type. Unlike fields embedded in a RequestType template, global fields are
// shown on every request form regardless of the selected request type
// (e.g. a "Reason" field that should always appear).
export type GlobalField = FieldDefinition;

const GlobalFieldSchema = new Schema<GlobalField>(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, enum: ["text", "number", "date", "file", "textarea"], required: true },
    required: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const GlobalFieldModel = models.GlobalField || model<GlobalField>("GlobalField", GlobalFieldSchema);
