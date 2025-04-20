import redisClient from "./redis.service";

class CashService {
  static instance: CashService;

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      CashService.instance = new CashService();
    }
    return this.instance;
  }

  public async set<T>(
    key: string,
    value: T,
    expirySeconds?: number
  ): Promise<boolean> {
    const stringValue = JSON.stringify(value);

    try {
      if (expirySeconds)
        await redisClient.setex(key, expirySeconds, stringValue);
      else await redisClient.set(key, stringValue);

      return true;
    } catch (error) {
      console.error(`Error setting cache for key ${key}:`, error);
      return false;
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      const value = await redisClient.get(key);

      if (!value) return null;

      console.log("✅ get data from cache", key);
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Error getting cache for key ${key}:`, error);
      return null;
    }
  }

  public async del(key: string): Promise<boolean> {
    try {
      await redisClient.del(key);
      return true;
    } catch (error) {
      console.error(`Error deleting cache for key ${key}:`, error);
      return false;
    }
  }

  public async clear(): Promise<boolean> {
    try {
      await redisClient.flushdb();
      return true;
    } catch (error) {
      console.error("Error clearing cache:", error);
      return false;
    }
  }
}

const cashService = CashService.getInstance();

export default cashService;
