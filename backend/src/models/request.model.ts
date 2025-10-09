import { models, model, Schema } from "mongoose";

type Request = {
  _id: Schema.Types.ObjectId;
  email: string;
  firstname: string;
  lastname: string;
  workPlace: {
      city: string;
      state: string;
      company_name: string;
      principalName:string,
  };
  school: {
      city: string;
      state: string;
      school_number: string;
      class: string;
  };
  position: string;
  requestDate: string;
  requestType: string;
  startTime?: string;
  endTime?: string;
  optionalFile: string;
  optionalFileMeduuleg: string;
  detailAboutRequest: string;
  result:string
    comment: string;
  supervisorEmail: string;
};

const RequestSchema = new Schema<Request>(
  {
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
        required: true,
    },
    lastname: {
      type: String,
        required: true,
    },
      requestType: {
        type: String,
          enum: ['longterm', 'shortterm', 'mediumterm'],
          default: 'shortterm',
      },
    startTime:String,
    endTime:String,
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
      },
    position: String,
      optionalFile: {
        type: String,
      },
      optionalFileMeduuleg: String,
    result: {
        type: String,
        enum: ['pending', 'sent', 'failed', 'success'],
        default: 'sent',
      },
      supervisorEmail: String,
      detailAboutRequest: {
        type: String,
          required: true,
      }
  },
  {
    timestamps: true,
  }
);

export const RequestModel = models.Request || model<Request>("Request", RequestSchema);
