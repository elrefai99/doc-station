import { Job } from "bullmq";

export const jobProcessor = async (job: Job): Promise<any> => {
     console.log(job);

};
