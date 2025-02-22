import { models, model, Schema } from "mongoose";

type Request = {
  _id: Schema.Types.ObjectId;
  email: string;
  firstname: string;
  lastname: string;
  workPlace: string;
  principalName:string,
  position: string;
  requestDate: Date;
  startTime?: string;
  endTime?: string;
  optionalFile: string;
  optionalFileMeduuleg: string;
  result:string
};

const RequestSchema = new Schema<Request>(
  {
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    requestDate: {
        type: Date,
        required: true,
      },
    startTime:String,
    endTime:String,
    workPlace:{type:String,},
    principalName: String,
    position: String,
    result: {
        type: String,
        enum: ['pending', 'sent', 'failed', 'success'],
        default: 'sent',
      },
  },
  {
    timestamps: true,
  }
);

export const RequestModel = models.Request || model<Request>("Request", RequestSchema);
