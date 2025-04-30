import { MutationResolvers } from "@/generated";
import { UserModel } from "@/models";
import bcrypt from 'bcrypt';


export const signUp: MutationResolvers["signUp"] = async (
  _,
  { email, password }
) => {
  const findUser = await UserModel.findOne({ email });
  if (findUser) throw new Error("User already signed up.");
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = await UserModel.create({ email, password: hashedPassword });
  return newUser;
};
