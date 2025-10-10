import { OTPModel, UserModel } from "@/models";
import { generateToken } from "@/utils/generate-token";
import {MutationResolvers} from "@/generated/graphql";

export const checkOTP:MutationResolvers['checkOTP'] = async (_:unknown,{email, OTP}: { email: string, OTP: string }) => {
    const findOtp = await OTPModel.findOne({ OTP });

    if(!findOtp){
      throw new Error('Invalid OTP')
    }
    if (findOtp.created_at < new Date()) {
      throw new Error('OTP is expired')
    }
  
    await OTPModel.deleteOne({email});
  
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
  
    const token = generateToken({id: user._id});
  
    return {
        message: 'Welcome',
        token: token,
    };
  };
  
  