// todo: use joi to validate env
const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  defaultCacheTTL: parseInt(process.env.DEFAULT_CACHE_TTL as string) || 300, // 5 min
  redis: {
    uri: process.env.REDIS_URI || "",
  },
  api: {
    baseUrl: process.env.EXTERNAL_API_BASE_URL,
  },
};

export default config;
