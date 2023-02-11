import { createClient, RedisClientType } from 'redis';

import { logger } from '.';

class Redis {
  private client: RedisClientType<any>;

  public create(): void {
    const envRedisHost = process.env.REDIS_HOST;
    if (envRedisHost) {
      this.client = createClient({
        url: envRedisHost,
      });
    } else {
      this.client = createClient();
    }

    this.client.on('connect', () => {
      logger.info('💜 Redis client connected!');
    });

    this.client.on('error', (error) => {
      logger.error('❌ Redis not connected: ', error);
    });

    this.client.on('end', () => {
      logger.error('❌ Redis connection has been closed!');
    });
  }

  public get getClient() {
    return this.client;
  }

  public getAsync(key: string): Promise<string | null> {
    return this.client.get(key);
  }
}

export default new Redis();
