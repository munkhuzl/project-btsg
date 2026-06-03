import { QueryResolvers } from "@/generated/graphql";
import { RequestTypeModel } from "@/models/requestType.model";

export const getRequestTypeTemplates: QueryResolvers["getRequestTypeTemplates"] = async (_, __, { userId }) => {
  if (!userId) throw new Error("User must be logged in");

  try {
    return await RequestTypeModel.find();
  } catch (error) {
    console.error("Error fetching request templates:", error);
    throw new Error("Failed to fetch request templates");
  }
};

export const getRequestTypeTemplate: QueryResolvers["getRequestTypeTemplate"] = async (_, { id }, { userId }) => {
  if (!userId) throw new Error("User must be logged in");

  try {
    const template = await RequestTypeModel.findById(id);
    if (!template) throw new Error("Request template not found");
    return template;
  } catch (error) {
    console.error("Error fetching request template:", error);
    throw new Error("Failed to fetch request template");
  }
};
