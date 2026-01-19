import { Job } from "bullmq";
import { sendgridFunction } from "../shared/sendGrid.shared";

export const sendEmail = async (data: any) => {
     console.log(data)
     switch (data.type) {
          case "login":
               await sendgridFunction(data.email, data.html, data.subject)
               break;
          case "otp":
               await sendgridFunction(data.email, data.html, data.subject)
               break;
          case "NewBooking":
               await sendgridFunction(data.email, data.html, data.subject)
               break;
          default:
               break;
     }
}

export const jobProcessor = async (job: Job): Promise<any> => {
     console.log(job.data);

     await sendEmail(job.data);
};
