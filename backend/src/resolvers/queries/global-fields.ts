import { QueryResolvers } from "@/generated/graphql";
import { GlobalFieldModel } from "@/models/globalField.model";

export const getGlobalFields: QueryResolvers["getGlobalFields"] = async (_, __, { userId }) => {
  if (!userId) throw new Error("User must be logged in");

  try {
    return await GlobalFieldModel.find();
  } catch (error) {
    console.error("Error fetching global fields:", error);
    throw new Error("Failed to fetch global fields");
  }
};
