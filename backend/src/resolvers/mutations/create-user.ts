import { MutationResolvers } from "@/generated/graphql";
import { UserModel } from "@/models";

export const signUp: MutationResolvers["signUp"] = async (
  _,
  { input }
) => {
  const {email, password} = input;
  const findUser = await UserModel.findOne({ email });

  if (findUser) throw new Error("User already signed up.");
  return await UserModel.create({
    email,
    password,
  });
};
