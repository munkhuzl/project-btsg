import { MutationResolvers } from "@/generated";
import { UserModel } from "@/models";



export const signUp: MutationResolvers["signUp"] = async (
  _,
  { email, password }
) => {
  const findUser = await UserModel.findOne({ email });
  if (findUser) throw new Error("User already signed up.");
  const createUser = await UserModel.create({ email, password });
  return createUser;
};
