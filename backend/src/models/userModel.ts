import { models, model, Schema } from "mongoose";
import bcrypt from "bcrypt";

type User = {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: string;
  phoneNumber: string;
  otp: string;
  passwordResetToken: string;
  passwordResetTokenExpire: Date;
  position: string;
  age?: number;
  birthDate: Date;
  home_address: string;
  workPlace: {
      city: string;
      state: string;
      company_name: string;
      principal_name: string;
  };
  school: {
      city: string;
      state: string;
      school_number: string;
      class: string;
  };
};

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
      position: String,
    phoneNumber: String,
    otp: {
      type: String,
      default: null,
    },
    passwordResetToken: { type: String, default: "" },
    passwordResetTokenExpire: { type: Date, default: undefined },
      age: Number,
      birthDate: Date,
      home_address: String,
      workPlace: {
        city: String,
          state: String,
          company_name: String,
          principal_name: String,
      },
      school: {
        city: String,
          state: String,
          school_number: String,
          class: String,
      }
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next(); // 🚫 Prevents moving on to hashing
    }

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        console.error(error);
    }
});

export const UserModel = models.User || model<User>("User", userSchema);
