import { Job } from "bullmq";
import { nodemailerFunction } from "../shared/nodemailer";

export const sendEmail = async (data: any) => {
     switch (data.type) {
          case "login":
               await nodemailerFunction(data.email, data.html, data.subject)
               break;
          case "otp":
               await nodemailerFunction(data.email, data.html, data.subject)
               break;
          case "NewBooking":
               await nodemailerFunction(data.email, data.html, data.subject)
               break;
          default:
               break;
     }
}

export const jobProcessor = async (job: Job): Promise<any> => {
     console.log(job.data);
     await sendEmail(job.data);
};
