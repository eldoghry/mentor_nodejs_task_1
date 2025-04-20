import axios, { AxiosError, AxiosRequestConfig } from "axios";

export default async function axiosRequestWithRetry(
  config: AxiosRequestConfig,
  retries: number = 3,
  delay: number = 1000
) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      config.timeout = attempt < retries ? 1 : undefined; // fabricate timeout error
      const response = await axios(config);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const status = err?.response?.status;

      const shouldRetry = !err?.response || (status && status >= 500);

      if (!shouldRetry || attempt === retries) throw err;

      console.warn(`Retrying request... (${attempt}/${retries})`);

      await new Promise((resolve) => setTimeout(resolve, attempt * delay)); // Exponential backoff 1s, 2s, 4s, ...
    }
  }
}
