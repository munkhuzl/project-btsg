import { MutationResolvers } from "@/generated/graphql";
import { RequestTypeModel } from "@/models/requestType.model";

export const createRequestType: MutationResolvers["createRequestType"] = async (_, { input }, { userId }) => {
  if (!userId) throw new Error("User must be logged in");

  try {
    const newTemplate = await RequestTypeModel.create({
      name: input.name,
      description: input.description,
      fields: input.fields,
    });
    return newTemplate;
  } catch (error) {
    console.error("Error creating RequestType template:", error);
    throw new Error("Failed to create request template");
  }
};

export const deleteRequestType: MutationResolvers["deleteRequestType"] = async (_, { id }, { userId }) => {
  if (!userId) throw new Error("User must be logged in");

  try {
    const deleted = await RequestTypeModel.findByIdAndDelete(id);
    return !!deleted;
  } catch (error) {
    console.error("Error deleting RequestType template:", error);
    throw new Error("Failed to delete request template");
  }
};
