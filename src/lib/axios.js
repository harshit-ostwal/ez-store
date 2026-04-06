import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 500;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    const isServerError = error.response?.status >= 500;

    if (!isServerError) {
      return Promise.reject(error);
    }

    config._retryCount = config._retryCount ?? 0;

    if (config._retryCount >= MAX_RETRIES) {
      return Promise.reject(error);
    }

    config._retryCount += 1;

    await new Promise((resolve) =>
      setTimeout(resolve, RETRY_DELAY_MS * config._retryCount),
    );

    return axiosInstance(config);
  },
);

export default axiosInstance;
