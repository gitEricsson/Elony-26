import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const handler = async (event: any) => {
  // Set CORS headers so your React app can talk to this function
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers };

  try {
    if (event.httpMethod === 'GET') {
      const wishes = await redis.lrange('wedding_wishes', 0, -1);
      return { statusCode: 200, headers, body: JSON.stringify(wishes) };
    }

    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      const newWish = {
        ...body,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      };
      await redis.lpush('wedding_wishes', newWish);
      return { statusCode: 200, headers, body: JSON.stringify(newWish) };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to process wish' }),
    };
  }
};
