import { createClient } from 'redis';

const client: any = createClient({
     url: process.env.REDIS_HOST,
     socket: {
          connectTimeout: 30000,
          reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
     },
});

client.connect().then(() => console.log(`🛢️  Redis connected successfully: ${process.env.REDIS_HOST}`));
client.on("error", (err: any) => console.log("Redis Client Error", err));

process.on('SIGINT', async () => {
     await client.disconnect();
     console.log('Redis connection closed');
     process.exit(0);
});
export default client;
