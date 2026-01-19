import { Queue, Job } from "bullmq";

export const queue = new Queue("emails", {
     connection: {
          url: process.env.NODE_ENV === "development" ? process.env.REDIS_HOST_LOCALHOST : process.env.REDIS_HOST,
     },
});

const REMOVE_CONFIG = {
     removeOnComplete: {
          age: 60 * 60,
     },
     removeOnFail: {
          age: 24 * 60 * 60,
     },
};

export async function addJobToQueue<T>(name: string, data: T): Promise<Job<T>> {
     return await queue.add(name, data, REMOVE_CONFIG);
}
