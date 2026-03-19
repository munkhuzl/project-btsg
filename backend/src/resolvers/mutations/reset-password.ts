import { MutationResolvers } from "@/generated/graphql";
import { UserModel, OTPModel } from "@/models";

export const resetPassword: MutationResolvers["resetPassword"] = async (
  _: unknown,
  { email, OTP, newPassword },
) => {
  const otpRecord = await OTPModel.findOne({ email, OTP });
  if (!otpRecord) throw new Error("Invalid OTP");
  if (otpRecord.expirationDate < new Date()) throw new Error("OTP expired");

  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found");

  user.password = newPassword;
  await user.save();

  await OTPModel.deleteOne({ email });

  return { message: "Password reset successful" };
};
