import { Worker, Job } from "bullmq";
import { jobProcessor } from "./job.process.emails";

const worker = new Worker('emails', jobProcessor, {
     connection: {
          url: process.env.NODE_ENV === "development" ? process.env.REDIS_HOST_LOCALHOST : process.env.REDIS_HOST,
     },
})

worker.on("completed", (job) => {
     job.updateProgress(100);
});

worker.on("failed", (job: Job | undefined, err: Error, _prev: string) => {
     if (job) {
          console.error(`Failed to send email to ${job.data.to}:`, err);
     } else {
          console.error(`Failed to send email: job is undefined`, err);
     }
});
