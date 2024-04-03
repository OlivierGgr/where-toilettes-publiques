import { createClient } from 'redis';

export default async function setupRedisConnection() {
    const client = createClient();

    client.on('error', err => console.log('Redis Client Error', err));
    
    await client.connect();
    return client.isReady;
}