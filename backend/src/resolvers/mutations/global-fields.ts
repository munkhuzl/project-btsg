import { MutationResolvers } from "@/generated/graphql";
import { GlobalFieldModel } from "@/models/globalField.model";

export const createGlobalField: MutationResolvers["createGlobalField"] = async (_, { input }, { userId }) => {
  if (!userId) throw new Error("User must be logged in");

  try {
    const newField = await GlobalFieldModel.create({
      id: input.id,
      label: input.label,
      type: input.type,
      required: input.required,
    });
    return newField;
  } catch (error) {
    console.error("Error creating global field:", error);
    throw new Error("Failed to create global field");
  }
};

export const deleteGlobalField: MutationResolvers["deleteGlobalField"] = async (_, { id }, { userId }) => {
  if (!userId) throw new Error("User must be logged in");

  try {
    const deleted = await GlobalFieldModel.findByIdAndDelete(id);
    return !!deleted;
  } catch (error) {
    console.error("Error deleting global field:", error);
    throw new Error("Failed to delete global field");
  }
};
